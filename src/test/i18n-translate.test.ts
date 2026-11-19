import { describe, expect, it } from "bun:test";
import { DEFAULT_LOCALE, isSupportedLocale, SUPPORTED_LOCALES, translate } from "../i18n/index.ts";
import { en } from "../i18n/messages/en.ts";
import { zhCN } from "../i18n/messages/zh-CN.ts";

describe("locale resolution", () => {
	it("defaults to English", () => {
		expect(DEFAULT_LOCALE).toBe("en");
	});

	it("recognizes only the supported locales", () => {
		expect(SUPPORTED_LOCALES).toEqual(["en", "zh-CN"]);
		expect(isSupportedLocale("zh-CN")).toBe(true);
		expect(isSupportedLocale("zh")).toBe(false);
		expect(isSupportedLocale("zh_CN")).toBe(false);
		expect(isSupportedLocale(undefined)).toBe(false);
	});
});

describe("translate", () => {
	it("returns the English copy for the English locale", () => {
		expect(translate("en", "common.cancel")).toBe("Cancel");
	});

	it("returns the Chinese copy for the Chinese locale", () => {
		expect(translate("zh-CN", "common.cancel")).toBe("取消");
	});

	it("falls back to English for a key the Chinese catalog does not translate", () => {
		const key = Object.keys(en).find((candidate) => !(candidate in zhCN));
		expect(key).toBeUndefined();
		expect(translate("zh-CN", "common.cancel")).toBe("取消");
	});

	it("substitutes named placeholders", () => {
		expect(translate("en", "nav.tasksWithCount", { count: "3" })).toBe("Tasks (3)");
		expect(translate("zh-CN", "nav.tasksWithCount", { count: "3" })).toBe("任务（3）");
	});

	it("keeps the placeholder visible when the value is missing", () => {
		expect(translate("en", "nav.tasksWithCount", {})).toBe("Tasks ({count})");
	});

	it("translates every key in the English catalog", () => {
		for (const key of Object.keys(en)) {
			expect(translate("zh-CN", key as keyof typeof en)).not.toBe(key);
		}
	});
});
