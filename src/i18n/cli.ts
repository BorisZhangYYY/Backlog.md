import { cliZhCN } from "./cli-zh-CN.ts";
import { isSupportedLocale, type Locale } from "./locale.ts";

/**
 * The environment variable that selects the language of the human-facing CLI output.
 *
 * A project's tasks, statuses and command arguments are never affected: only the wording of
 * help and terminal prompts changes, so scripts and JSON output behave the same in every language.
 */
export const CLI_LANGUAGE_ENV = "BACKLOG_LANG";

type Environment = Record<string, string | undefined>;

/** Resolves the CLI language, defaulting to English so an unset environment reads as before. */
export function cliLocale(env: Environment): Locale {
	const requested = env[CLI_LANGUAGE_ENV]?.trim();
	return isSupportedLocale(requested) ? requested : "en";
}

const cliCatalogs: Partial<Record<Locale, Record<string, string>>> = {
	"zh-CN": cliZhCN,
};

/** Substitutes `{name}` placeholders; a missing value leaves its placeholder visible. */
function interpolate(message: string, values?: Record<string, string | number>): string {
	if (!values) return message;
	return message.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
		const value = values[name];
		return value === undefined ? placeholder : String(value);
	});
}

/**
 * Translates one piece of CLI copy.
 *
 * English text is the key, so a string an upstream release adds renders in English until it is
 * translated, instead of disappearing or showing a key.
 */
export function cliT(locale: Locale, text: string, values?: Record<string, string | number>): string {
	const catalog = cliCatalogs[locale];
	const message = catalog?.[text] ?? text;
	return interpolate(message, values);
}

/** Translates a description commander rendered from an English source string. */
export function localizeHelpText(locale: Locale, text: string): string {
	const catalog = cliCatalogs[locale];
	return catalog?.[text] ?? text;
}
