import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { mkdir } from "node:fs/promises";
import { $ } from "bun";
import { Core } from "../core/backlog.ts";
import type { Task } from "../types";
import { getTestCliPath } from "./test-cli.ts";
import { createUniqueTestDir, initializeFilesystemTestProject, safeCleanup } from "./test-utils.ts";

const CLI_PATH = getTestCliPath();

let TEST_DIR: string;
let core: Core;

describe("CLI language selection", () => {
	beforeEach(async () => {
		TEST_DIR = createUniqueTestDir("test-cli-language");
		await mkdir(TEST_DIR, { recursive: true });
		core = new Core(TEST_DIR);
		await initializeFilesystemTestProject(core, "CLI Language Test");

		const seedTask: Task = {
			id: "task-1",
			title: "First Task",
			status: "To Do",
			assignee: [],
			createdDate: "2026-01-01 00:00",
			labels: [],
			dependencies: [],
			description: "Seed task description",
		};
		await core.createTask(seedTask, false);
	});

	afterEach(async () => {
		await safeCleanup(TEST_DIR);
	});

	test("prints English help by default", async () => {
		const result = await $`bun ${CLI_PATH} task create --help`.cwd(TEST_DIR).quiet();

		expect(result.exitCode).toBe(0);
		const out = result.stdout.toString();
		expect(out).toContain("Options:");
		expect(out).toContain("Input schema:");
		expect(out).toContain("task description");
	});

	test("prints Chinese help when BACKLOG_LANG selects it, keeping flags as written", async () => {
		const result = await $`BACKLOG_LANG=zh-CN bun ${CLI_PATH} task create --help`.cwd(TEST_DIR).quiet();

		expect(result.exitCode).toBe(0);
		const out = result.stdout.toString();
		expect(out).toContain("选项：");
		expect(out).toContain("任务描述");
		expect(out).toContain("--description <text>");
		expect(out).not.toContain("task description");
	});

	test("falls back to English for an unsupported language instead of failing", async () => {
		const result = await $`BACKLOG_LANG=fr bun ${CLI_PATH} task create --help`.cwd(TEST_DIR).quiet();

		expect(result.exitCode).toBe(0);
		expect(result.stdout.toString()).toContain("task description");
	});

	test("leaves the machine-readable JSON output identical in both languages", async () => {
		const english = await $`bun ${CLI_PATH} task list --json`.cwd(TEST_DIR).quiet();
		const chinese = await $`BACKLOG_LANG=zh-CN bun ${CLI_PATH} task list --json`.cwd(TEST_DIR).quiet();

		expect(english.exitCode).toBe(0);
		expect(chinese.exitCode).toBe(0);
		expect(chinese.stdout.toString()).toBe(english.stdout.toString());
	});

	test("keeps exit codes and stored task data unchanged", async () => {
		const chinese = await $`BACKLOG_LANG=zh-CN bun ${CLI_PATH} task view TASK-1 --plain`.cwd(TEST_DIR).quiet();

		expect(chinese.exitCode).toBe(0);
		expect(chinese.stdout.toString()).toContain("Status: ○ To Do");

		const missing = await $`BACKLOG_LANG=zh-CN bun ${CLI_PATH} task view TASK-999 --plain`
			.cwd(TEST_DIR)
			.quiet()
			.nothrow();
		expect(missing.exitCode).not.toBe(0);
	});
});
