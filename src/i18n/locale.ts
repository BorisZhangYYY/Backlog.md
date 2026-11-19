import { en, type MessageKey } from "./messages/en.ts";
import { zhCN } from "./messages/zh-CN.ts";

export const SUPPORTED_LOCALES = ["en", "zh-CN"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/** The locale every surface starts in, so an untouched installation still reads as it always did. */
export const DEFAULT_LOCALE: Locale = "en";

export function isSupportedLocale(value: unknown): value is Locale {
	return typeof value === "string" && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

const catalogs: Record<Locale, Record<MessageKey, string>> = {
	en,
	"zh-CN": zhCN,
};

/** The name each locale is written in, so a language picker can list the languages themselves. */
export const LOCALE_NAMES: Record<Locale, string> = {
	en: "English",
	"zh-CN": "简体中文",
};

/** Values substituted into a message. A missing value leaves its placeholder visible. */
export type MessageValues = Record<string, string | number>;

function interpolate(message: string, values?: MessageValues): string {
	if (!values) return message;
	return message.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
		const value = values[name];
		return value === undefined ? placeholder : String(value);
	});
}

/**
 * Looks up one message in a locale.
 *
 * A key the locale does not define falls back to English, and an unknown key returns the key
 * itself, so a missing translation degrades to readable English instead of breaking the surface.
 */
export function translate(locale: Locale, key: MessageKey, values?: MessageValues): string {
	const catalog = catalogs[locale] ?? catalogs[DEFAULT_LOCALE];
	const message = catalog[key] ?? catalogs[DEFAULT_LOCALE][key] ?? key;
	return interpolate(message, values);
}

export type { MessageKey };
export { en, zhCN };
