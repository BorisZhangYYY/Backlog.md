import { describe, expect, it } from "bun:test";
import { CLI_LANGUAGE_ENV, cliLocale, cliT, localizeHelpText } from "../i18n/cli.ts";

describe("cliLocale", () => {
	it("defaults to English so scripts and help output stay unchanged", () => {
		expect(cliLocale({})).toBe("en");
	});

	it("accepts the supported locale names", () => {
		expect(cliLocale({ [CLI_LANGUAGE_ENV]: "zh-CN" })).toBe("zh-CN");
		expect(cliLocale({ [CLI_LANGUAGE_ENV]: "en" })).toBe("en");
	});

	it("falls back to English for an unsupported value instead of failing", () => {
		expect(cliLocale({ [CLI_LANGUAGE_ENV]: "fr" })).toBe("en");
		expect(cliLocale({ [CLI_LANGUAGE_ENV]: "" })).toBe("en");
	});
});

describe("cliT", () => {
	it("returns the English copy in English", () => {
		expect(cliT("en", "Input schema:")).toBe("Input schema:");
	});

	it("returns the Chinese copy in Chinese", () => {
		expect(cliT("zh-CN", "Input schema:")).toBe("输入字段：");
	});

	it("keeps untranslated text as-is rather than dropping it", () => {
		expect(cliT("zh-CN", "An untranslated sentence")).toBe("An untranslated sentence");
	});

	it("substitutes named placeholders", () => {
		expect(cliT("zh-CN", "  - None", {})).toBe("  - 无");
	});
});

describe("localizeHelpText", () => {
	it("translates a whole option description when it is known", () => {
		expect(localizeHelpText("zh-CN", "task description")).toBe("任务描述");
	});

	it("leaves an unknown description unchanged", () => {
		expect(localizeHelpText("zh-CN", "some new upstream description")).toBe("some new upstream description");
	});

	it("keeps English untouched", () => {
		expect(localizeHelpText("en", "task description")).toBe("task description");
	});
});
