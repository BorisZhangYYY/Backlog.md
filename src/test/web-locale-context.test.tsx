import { describe, expect, it } from "bun:test";
import { afterEach } from "bun:test";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { JSDOM } from "jsdom";
import LocaleProvider, { useLocale } from "../web/contexts/LocaleContext.tsx";
import LanguageSwitcher from "../web/components/LanguageSwitcher.tsx";

const originalFetch = globalThis.fetch;
let activeRoot: Root | null = null;

const setupDom = () => {
	const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", { url: "http://localhost" });
	(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
	globalThis.window = dom.window as unknown as Window & typeof globalThis;
	globalThis.document = dom.window.document as unknown as Document;
	globalThis.navigator = dom.window.navigator as unknown as Navigator;
	globalThis.localStorage = dom.window.localStorage as unknown as Storage;
};

const LocaleProbe = () => {
	const { locale, setLocale, t } = useLocale();
	return (
		<div>
			<span data-testid="locale">{locale}</span>
			<span data-testid="copy">{t("nav.kanbanBoard")}</span>
			<button type="button" onClick={() => setLocale("zh-CN")}>
				zh
			</button>
		</div>
	);
};

const render = (children: React.ReactNode): HTMLElement => {
	const container = document.getElementById("root") as HTMLElement;
	if (activeRoot) {
		act(() => {
			activeRoot?.unmount();
		});
		activeRoot = null;
	}
	activeRoot = createRoot(container);
	act(() => {
		activeRoot?.render(<LocaleProvider>{children}</LocaleProvider>);
	});
	return container;
};

const clickElement = async (element: Element) => {
	await act(async () => {
		element.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
		await Promise.resolve();
	});
};

afterEach(() => {
	globalThis.fetch = originalFetch;
	if (activeRoot) {
		act(() => {
			activeRoot?.unmount();
		});
		activeRoot = null;
	}
});

describe("LocaleContext", () => {
	it("starts in English and can switch to Simplified Chinese", async () => {
		setupDom();
		const container = render(<LocaleProbe />);

		expect(container.querySelector("[data-testid='locale']")?.textContent).toBe("en");
		expect(container.querySelector("[data-testid='copy']")?.textContent).toBe("Kanban Board");

		await clickElement(container.querySelector("button") as Element);

		expect(container.querySelector("[data-testid='locale']")?.textContent).toBe("zh-CN");
		expect(container.querySelector("[data-testid='copy']")?.textContent).toBe("看板");
	});

	it("remembers the chosen language across a reload", async () => {
		setupDom();
		const container = render(<LocaleProbe />);
		await clickElement(container.querySelector("button") as Element);

		expect(localStorage.getItem("backlog-locale")).toBe("zh-CN");

		const reloaded = render(<LocaleProbe />);
		expect(reloaded.querySelector("[data-testid='locale']")?.textContent).toBe("zh-CN");
		expect(reloaded.querySelector("[data-testid='copy']")?.textContent).toBe("看板");
	});

	it("sets the document language so assistive technology reads the right one", async () => {
		setupDom();
		const container = render(<LocaleProbe />);
		await clickElement(container.querySelector("button") as Element);

		expect(document.documentElement.lang).toBe("zh-CN");
	});
});

describe("LanguageSwitcher", () => {
	it("offers both languages and reports the chosen one", async () => {
		setupDom();
		const container = render(<LanguageSwitcher />);

		const select = container.querySelector("select") as HTMLSelectElement;
		expect(select).toBeTruthy();
		expect(Array.from(select.options).map((option) => option.value)).toEqual(["en", "zh-CN"]);

		await act(async () => {
			select.value = "zh-CN";
			select.dispatchEvent(new window.Event("change", { bubbles: true }));
			await Promise.resolve();
		});

		expect(localStorage.getItem("backlog-locale")).toBe("zh-CN");
		expect(document.documentElement.lang).toBe("zh-CN");
	});
});
