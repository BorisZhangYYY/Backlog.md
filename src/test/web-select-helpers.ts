import { expect } from "bun:test";
import { act } from "react";

export function getCombobox(container: HTMLElement, label: string): HTMLButtonElement {
	const trigger = Array.from(container.querySelectorAll<HTMLButtonElement>('button[role="combobox"]')).find(
		(button) => button.getAttribute("aria-label") === label,
	);
	if (!trigger) throw new Error(`Missing combobox: ${label}`);
	return trigger;
}

export async function openCombobox(trigger: HTMLButtonElement): Promise<HTMLElement[]> {
	await act(async () => {
		trigger.focus();
		trigger.dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
	});
	const controls = trigger.getAttribute("aria-controls");
	const list = controls && trigger.ownerDocument.getElementById(controls);
	if (!list || trigger.getAttribute("aria-expanded") !== "true") throw new Error("Combobox did not open");
	return Array.from(list.querySelectorAll<HTMLElement>('[role="option"]'));
}

export async function closeCombobox(trigger: HTMLButtonElement): Promise<void> {
	await act(async () => {
		trigger.ownerDocument.activeElement?.dispatchEvent(
			new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
		);
	});
	expect(trigger.getAttribute("aria-expanded")).toBe("false");
}

export async function comboboxLabels(trigger: HTMLButtonElement): Promise<string[]> {
	const options = await openCombobox(trigger);
	await closeCombobox(trigger);
	return options.map((option) => option.textContent ?? "");
}

export async function chooseComboboxOption(trigger: HTMLButtonElement, label: string): Promise<void> {
	const options = await openCombobox(trigger);
	const option = options.find((item) => item.textContent === label);
	if (!option) throw new Error(`Missing combobox option: ${label}`);
	await act(async () => {
		option.dispatchEvent(new window.PointerEvent("pointerdown", { pointerType: "mouse", bubbles: true }));
		option.click();
	});
}
