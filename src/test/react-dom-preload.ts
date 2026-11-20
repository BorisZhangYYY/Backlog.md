import { JSDOM } from "jsdom";

const DOM_GLOBALS = ["window", "document", "navigator"] as const;
type DomGlobal = (typeof DOM_GLOBALS)[number];

export async function initializeReactDomForTests(loadReactDom: () => Promise<unknown>): Promise<void> {
	const descriptors = new Map<DomGlobal, PropertyDescriptor | undefined>(
		DOM_GLOBALS.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]),
	);
	const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost" });

	try {
		Object.defineProperties(globalThis, {
			window: { value: dom.window, writable: true, enumerable: true, configurable: true },
			document: { value: dom.window.document, writable: true, enumerable: true, configurable: true },
			navigator: { value: dom.window.navigator, writable: true, enumerable: true, configurable: true },
		});
		await loadReactDom();
	} finally {
		try {
			dom.window.close();
		} finally {
			for (const name of DOM_GLOBALS) {
				const descriptor = descriptors.get(name);
				if (descriptor) Object.defineProperty(globalThis, name, descriptor);
				else Reflect.deleteProperty(globalThis, name);
			}
		}
	}
}

await initializeReactDomForTests(async () => {
	await import("react-dom/client");
	await import("@base-ui/react/select");
});

// DOM helpers used by the dropdown's positioning library must come from the active JSDOM window.
globalThis.requestAnimationFrame ??= (callback) => window.setTimeout(() => callback(performance.now()), 0);
globalThis.cancelAnimationFrame ??= (id) => window.clearTimeout(id);
for (const name of ["Element", "HTMLElement", "Node", "ShadowRoot", "getComputedStyle"] as const) {
	if (name in globalThis) continue;
	let override: unknown;
	Object.defineProperty(globalThis, name, {
		configurable: true,
		get() {
			if (!globalThis.window) return override;
			return override ?? (name === "getComputedStyle" ? window.getComputedStyle.bind(window) : window[name]);
		},
		set(value: unknown) {
			override = value;
		},
	});
}
