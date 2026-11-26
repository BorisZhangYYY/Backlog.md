import { afterEach, beforeEach, expect, it, spyOn } from "bun:test";
import { mkdir, realpath, symlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { FileSystem } from "../file-system/operations.ts";

import { BacklogServer } from "../server/index.ts";
import { createUniqueTestDir, safeCleanup } from "./test-utils.ts";

let projectDir: string;
let docsDir: string;
let server: BacklogServer | undefined;

beforeEach(async () => {
	projectDir = createUniqueTestDir("server-document-files");
	const filesystem = new FileSystem(projectDir);
	await filesystem.ensureBacklogStructure();
	await filesystem.saveConfig({
		projectName: "Document files",
		statuses: ["To Do", "In Progress", "Done"],
		labels: [],
		milestones: [],
		dateFormat: "YYYY-MM-DD",
		remoteOperations: false,
	});
	docsDir = filesystem.docsDir;
});

afterEach(async () => {
	await server?.stop();
	server = undefined;
	await safeCleanup(projectDir);
});

async function startBrowser(host = "127.0.0.1"): Promise<string> {
	server = new BacklogServer(projectDir);
	await server.start(0, false, host);
	return `http://127.0.0.1:${server.getPort()}`;
}

it("lists unreferenced files with their documentation-relative paths", async () => {
	await mkdir(join(docsDir, "test environment"));
	for (const filename of ["deployment-guide.md", "deployment-screenshot.png", "acceptance-report.pdf"]) {
		await writeFile(join(docsDir, "test environment", filename), "fixture");
	}
	await writeFile(join(docsDir, "handover-notes.docx"), "fixture");
	await writeFile(join(docsDir, "existing.MD"), "fixture");
	await writeFile(join(docsDir, ".private.pdf"), "fixture");
	await writeFile(join(projectDir, "outside.pdf"), "fixture");

	const origin = await startBrowser();
	const response = await fetch(`${origin}/api/documentation-files`);
	expect(response.status).toBe(200);
	const files = await response.json();
	expect(files).toHaveLength(4);
	expect(files).toEqual(
		expect.arrayContaining([
			{ path: "existing.MD", kind: "other" },
			{ path: "handover-notes.docx", kind: "document" },
			{ path: "test environment/acceptance-report.pdf", kind: "document" },
			{ path: "test environment/deployment-screenshot.png", kind: "image" },
		]),
	);
});

it("serves a documentation image without serving other file types", async () => {
	const path = "截图 #1.png";
	await writeFile(join(docsDir, path), "image fixture");
	await writeFile(join(docsDir, "report.pdf"), "document fixture");
	const origin = await startBrowser();
	const image = await fetch(`${origin}/api/documentation-files/image?${new URLSearchParams({ path })}`);
	expect(image.status).toBe(200);
	expect(image.headers.get("Content-Type")).toBe("image/png");
	expect(await image.text()).toBe("image fixture");
	expect((await fetch(`${origin}/api/documentation-files/image?path=report.pdf`)).status).toBe(404);
});

it.skipIf(process.platform === "win32")("does not list or serve images via a symbolic link", async () => {
	await writeFile(join(projectDir, "outside.png"), "outside fixture");
	await symlink(join(projectDir, "outside.png"), join(docsDir, "link.png"));
	await symlink(projectDir, join(docsDir, "linked-folder"), "dir");
	const origin = await startBrowser();
	expect(await (await fetch(`${origin}/api/documentation-files`)).json()).toEqual([]);
	const response = await fetch(`${origin}/api/documentation-files/image?path=linked-folder%2Foutside.png`);
	expect(response.status).toBe(404);
});

it("does not expose documentation files when listening remotely", async () => {
	await writeFile(join(docsDir, "screenshot.png"), "image fixture");
	const origin = await startBrowser("0.0.0.0");
	expect(await (await fetch(`${origin}/api/documentation-files`)).json()).toEqual([]);
	expect((await fetch(`${origin}/api/documentation-files/image?path=screenshot.png`)).status).toBe(404);
});

function requestOpen(origin: string, path: string, requestOrigin: string | null = origin): Promise<Response> {
	return fetch(`${origin}/api/documentation-files/open`, {
		method: "POST",
		headers: { "Content-Type": "application/json", ...(requestOrigin === null ? {} : { Origin: requestOrigin }) },
		body: JSON.stringify({ path }),
	});
}

it.skipIf(process.platform === "win32")(
	"passes the exact original path to the desktop opener only for the local browser origin",
	async () => {
		const spawn = Bun.spawn;
		const opener = process.platform === "darwin" ? "/usr/bin/open" : "xdg-open";
		const opened: string[][] = [];
		const open = spyOn(Bun, "spawn").mockImplementation((...args) => {
			const command = args[0];
			if (Array.isArray(command) && command[0] === opener) {
				opened.push(command);
				return spawn([process.execPath, "-e", ""], { stdout: "ignore", stderr: "ignore" });
			}
			return Reflect.apply(spawn, Bun, args);
		});
		try {
			const path = "报告 #1.pdf";
			await writeFile(join(docsDir, path), "document fixture");
			await writeFile(join(docsDir, "script.command"), "not a document");
			const origin = await startBrowser();
			expect((await requestOpen(origin, path)).status).toBe(204);
			expect((await requestOpen(origin, path, null)).status).toBe(403);
			expect((await requestOpen(origin, path, "http://localhost:9")).status).toBe(403);
			expect((await requestOpen(origin, "script.command")).status).toBe(404);
			expect((await requestOpen(origin, "../report.pdf")).status).toBe(404);
			expect(opened).toEqual([[opener, await realpath(join(docsDir, path))]]);
		} finally {
			open.mockRestore();
		}
	},
);

it.skipIf(process.platform !== "darwin")(
	"does not launch Finder aliases or files whose alias status could not be read",
	async () => {
		const spawn = Bun.spawn;
		const opened: string[][] = [];
		const aliasChecks: string[] = [];
		const open = spyOn(Bun, "spawn").mockImplementation((...args) => {
			const command = args[0];
			if (Array.isArray(command) && command[0] === "/usr/bin/open") {
				opened.push(command);
				return spawn([process.execPath, "-e", ""], { stdout: "ignore", stderr: "ignore" });
			}
			if (Array.isArray(command) && command[0] === "/usr/bin/osascript") {
				const path = command.at(-1) ?? "";
				aliasChecks.push(path);
				const result = path.endsWith("alias.pdf") ? 'console.log("true")' : "process.exit(1)";
				return spawn([process.execPath, "-e", result], { stdout: "pipe", stderr: "ignore" });
			}
			return Reflect.apply(spawn, Bun, args);
		});
		try {
			await writeFile(join(docsDir, "alias.pdf"), "simulated macOS alias classification");
			await writeFile(join(docsDir, "unknown.pdf"), "simulated macOS metadata error");
			const origin = await startBrowser();
			expect((await requestOpen(origin, "alias.pdf")).status).toBe(404);
			expect((await requestOpen(origin, "unknown.pdf")).status).toBe(500);
			expect(aliasChecks).toEqual([
				await realpath(join(docsDir, "alias.pdf")),
				await realpath(join(docsDir, "unknown.pdf")),
			]);
			expect(opened).toEqual([]);
		} finally {
			open.mockRestore();
		}
	},
);

it("refuses opening an original even through a loopback request when listening remotely", async () => {
	await writeFile(join(docsDir, "report.pdf"), "document fixture");
	const origin = await startBrowser("0.0.0.0");
	expect((await requestOpen(origin, "report.pdf")).status).toBe(403);
});
