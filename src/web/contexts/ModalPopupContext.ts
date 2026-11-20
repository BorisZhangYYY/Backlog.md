import { createContext, type RefObject } from "react";

export const ModalPopupContainer = createContext<RefObject<HTMLDivElement | null> | undefined>(undefined);

// Modal capture handlers run before the listbox gets its own key event.
export function isOpenListboxTarget(target: EventTarget | null): boolean {
	return (target as Element | null)?.closest?.('[role="combobox"][aria-expanded="true"], [role="listbox"]') != null;
}
