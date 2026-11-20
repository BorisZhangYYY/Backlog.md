import { Select } from "@base-ui/react/select";
import { type AriaAttributes, useContext } from "react";
import { ModalPopupContainer } from "../contexts/ModalPopupContext";

interface ThemedSelectProps<Value extends string>
	extends Pick<AriaAttributes, "aria-label" | "aria-invalid" | "aria-describedby"> {
	value: Value | null | undefined;
	options: ReadonlyArray<{ value: Value; label: string }>;
	onChange: (value: Value) => void;
	disabled?: boolean;
	id?: string;
	title?: string;
	className?: string;
}
export default function ThemedSelect<Value extends string>({
	value,
	options,
	onChange,
	disabled,
	className = "",
	...triggerProps
}: ThemedSelectProps<Value>) {
	const popupContainer = useContext(ModalPopupContainer);
	const selected = options.find((option) => option.value === value) ?? options[0];

	return (
		<Select.Root<Value>
			value={selected?.value ?? null}
			disabled={disabled || options.length === 0}
			modal={false}
			onValueChange={(next) => {
				if (next !== null) onChange(next);
			}}
		>
			<Select.Trigger
				{...triggerProps}
				className={`inline-flex max-w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 text-left text-sm text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-stone-500 disabled:cursor-not-allowed disabled:opacity-60 data-[popup-open]:border-stone-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus-visible:outline-stone-400 dark:data-[popup-open]:border-stone-400 ${className}`}
			>
				<Select.Value className="truncate">{selected?.label}</Select.Value>
				<Select.Icon className="shrink-0 text-gray-500 data-[popup-open]:rotate-180 dark:text-gray-400">
					<svg aria-hidden="true" className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
						<path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal container={popupContainer}>
				<Select.Positioner align="start" alignItemWithTrigger={false} positionMethod="fixed" sideOffset={4} className="z-[60]">
					<Select.Popup
						className="w-[min(var(--anchor-width),var(--available-width))] max-h-[min(18rem,var(--available-height))] overflow-y-auto overscroll-contain rounded-lg border border-gray-200 bg-white p-1 text-sm text-gray-900 shadow-lg outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
					>
						{options.map((option) => (
							<Select.Item
								key={option.value}
								value={option.value}
								label={option.label}
								className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 outline-none data-[highlighted]:bg-gray-100 data-[selected]:font-semibold dark:data-[highlighted]:bg-gray-700"
							>
								<Select.ItemText className="min-w-0 flex-1 wrap-anywhere">{option.label}</Select.ItemText>
								<span aria-hidden="true" className="size-4 shrink-0 text-blue-600 dark:text-blue-400">
									<Select.ItemIndicator>
										<svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
											<path d="m3.5 8 3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</Select.ItemIndicator>
								</span>
							</Select.Item>
						))}
					</Select.Popup>
				</Select.Positioner>
			</Select.Portal>
		</Select.Root>
	);
}
