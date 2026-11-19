import type React from "react";
import type { MessageKey, MessageValues } from "../../i18n/index.ts";
import { useLocale } from "../contexts/LocaleContext.tsx";
import { formatStoredDateForCompactDisplay, formatStoredDateForDisplay } from "../utils/date-display";

interface StoredDateProps {
	value?: string;
	dateFormat?: string;
	/** Dense lists render recent values relatively ("today", "3d ago"). */
	compact?: boolean;
	className?: string;
}

/** Recent days name the day itself for the first two, then count the days elapsed. */
function translateRelativeDay(days: number, t: (key: MessageKey, values?: MessageValues) => string): string {
	if (days === 0) return t("date.today");
	if (days === 1) return t("date.yesterday");
	return t("date.daysAgo", { count: days });
}

/**
 * Renders a stored UTC date as local time with the canonical UTC value on hover.
 * Every web surface showing a stored date goes through this, so no component converts on its own.
 */
const StoredDate: React.FC<StoredDateProps> = ({ value, dateFormat, compact = false, className }) => {
	const { t } = useLocale();
	const { text, title } = compact
		? formatStoredDateForCompactDisplay(value, {
				dateFormat,
				relative: (days) => translateRelativeDay(days, t),
			})
		: formatStoredDateForDisplay(value, { dateFormat });

	return (
		<span className={className} title={title}>
			{text}
		</span>
	);
};

export default StoredDate;
