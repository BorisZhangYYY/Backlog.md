import { expect, it, spyOn } from "bun:test";
import { JSDOM } from "jsdom";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import type { Document, DocumentationFile } from "../types";
import { DocumentationFiles } from "../web/components/DocumentationFiles";
import SideNavigation from "../web/components/SideNavigation";
import { apiClient } from "../web/lib/api";

it("renders distinct sidebar icons for Markdown and each attachment family", async () => {
	const docs: Document[] = [
		{ id: "doc-1", title: "Setup guide", type: "guide", createdDate: "2026-01-01", rawContent: "" },
	];
	const files: DocumentationFile[] = [
		{ path: "assets/screenshot.png", kind: "image" },
		{ path: "assets/report.PDF", kind: "document" },
		{ path: "notes.docx", kind: "document" },
		{ path: "budget.xlsx", kind: "document" },
		{ path: "slides.pptx", kind: "document" },
		{ path: "archive.zip", kind: "other" },
		{ path: "appendix.pdf", kind: "document" },
	];
	const { window } = new JSDOM("<!doctype html><body><div id='root'></div></body>", { url: "http://localhost" });
	const globals = {
		window,
		document: window.document,
		localStorage: window.localStorage,
		CustomEvent: window.CustomEvent,
		MutationObserver: window.MutationObserver,
		IS_REACT_ACT_ENVIRONMENT: true,
	};
	const originals = Object.fromEntries(Object.keys(globals).map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
	for (const [key, value] of Object.entries(globals)) {
		Object.defineProperty(globalThis, key, { configurable: true, value, writable: true });
	}
	const filesMock = spyOn(apiClient, "fetchDocumentationFiles").mockResolvedValue(files);
	const container = window.document.body;
	const root = createRoot(container);
	try {
		await act(async () => {
			root.render(
				<MemoryRouter>
					<DocumentationFiles>
						<SideNavigation
							taskCount={0}
							docs={docs}
							decisions={[]}
							isLoading={false}
							onRetry={async () => {}}
							onRefreshData={async () => {}}
						/>
					</DocumentationFiles>
				</MemoryRouter>,
			);
		});

		const iconFor = (name: string) => {
			const label = Array.from(container.querySelectorAll("nav span")).find((span) => span.textContent === name);
			const icon = label?.parentElement?.querySelector("svg");
			expect(icon).toBeDefined();
			return icon?.innerHTML;
		};
		const names = ["Setup guide", "screenshot.png", "report.PDF", "notes.docx", "budget.xlsx", "slides.pptx", "archive.zip"];
		expect(new Set(names.map(iconFor)).size).toBe(names.length);
		expect(iconFor("report.PDF")).toBe(iconFor("appendix.pdf"));
	} finally {
		await act(async () => root.unmount());
		filesMock.mockRestore();
		window.close();
		for (const [key, descriptor] of Object.entries(originals)) {
			if (descriptor) Object.defineProperty(globalThis, key, descriptor);
			else Reflect.deleteProperty(globalThis, key);
		}
	}
});
