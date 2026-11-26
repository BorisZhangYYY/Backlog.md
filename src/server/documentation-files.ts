import { lstat, readdir, realpath } from "node:fs/promises";
import { extname, join } from "node:path";
import type { DocumentationFile } from "../types/index.ts";

const imageTypes = new Map([
	[".avif", "image/avif"],
	[".bmp", "image/bmp"],
	[".gif", "image/gif"],
	[".jpeg", "image/jpeg"],
	[".jpg", "image/jpeg"],
	[".png", "image/png"],
	[".svg", "image/svg+xml"],
	[".webp", "image/webp"],
]);

const openableExtensions = new Set([
	".csv",
	".doc",
	".docx",
	".odp",
	".ods",
	".odt",
	".pdf",
	".ppt",
	".pptx",
	".rtf",
	".txt",
	".xls",
	".xlsx",
]);

function isVisiblePathSegment(name: string): boolean {
	return name.length > 0 && !name.startsWith(".") && !/[\\:]/.test(name) && !name.includes("\0") && !/[. ]$/.test(name);
}

export async function listDocumentationFiles(root: string): Promise<DocumentationFile[]> {
	if (!(await lstat(root).catch(() => null))?.isDirectory()) return [];
	const files: DocumentationFile[] = [];
	const folders = [""];
	for (const folder of folders) {
		if (folder && !(await lstat(join(root, folder)).catch(() => null))?.isDirectory()) continue;
		const entries = await readdir(join(root, folder), { withFileTypes: true }).catch(() => []);
		for (const entry of entries) {
			if (!isVisiblePathSegment(entry.name)) continue;
			const path = folder ? `${folder}/${entry.name}` : entry.name;
			if (entry.isDirectory()) {
				folders.push(path);
			} else if (entry.isFile()) {
				// Match the Markdown store's case-sensitive suffix, so no file falls between the two lists.
				if (entry.name.endsWith(".md")) continue;
				const extension = extname(entry.name).toLowerCase();
				const kind = imageTypes.has(extension) ? "image" : openableExtensions.has(extension) ? "document" : "other";
				files.push({ path, kind });
			}
		}
	}
	return files;
}

async function resolveDocumentationFile(root: string, path: string): Promise<string | null> {
	const segments = path.split("/");
	if (!segments.every(isVisiblePathSegment)) return null;
	if (!(await lstat(root).catch(() => null))?.isDirectory()) return null;
	const canonicalRoot = await realpath(root).catch(() => null);
	if (!canonicalRoot) return null;
	let current = canonicalRoot;
	for (const [index, segment] of segments.entries()) {
		current = join(current, segment);
		const entry = await lstat(current).catch(() => null);
		if (!(index === segments.length - 1 ? entry?.isFile() : entry?.isDirectory())) return null;
	}
	return (await realpath(current).catch(() => null)) === current ? current : null;
}

export async function serveDocumentationImage(root: string, path: string): Promise<Response> {
	const mime = imageTypes.get(extname(path).toLowerCase());
	const filename = mime ? await resolveDocumentationFile(root, path) : null;
	if (!filename || !mime) return new Response("Not Found", { status: 404 });
	return new Response(Bun.file(filename), {
		headers: {
			"Content-Type": mime,
			"Content-Security-Policy": "sandbox; default-src 'none'",
			"X-Content-Type-Options": "nosniff",
			"Cache-Control": "no-store",
		},
	});
}

// Finder aliases may pass lstat().isFile(). Ask Foundation for the resource flag without resolving
// the alias or contacting Finder. The script is fixed; the filename is passed as an argument.
const macAliasCheck = `function run(argv) {
	ObjC.import("Foundation");
	const url = $.NSURL.fileURLWithPath(argv[0]);
	const alias = Ref();
	if (!url.getResourceValueForKeyError(alias, $.NSURLIsAliasFileKey, null)) throw Error("Unable to read alias status");
	return ObjC.unwrap(alias[0]);
}`;

async function isMacFinderAlias(filename: string): Promise<boolean> {
	const check = Bun.spawn(["/usr/bin/osascript", "-l", "JavaScript", "-e", macAliasCheck, "--", filename], {
		stdout: "pipe",
		stderr: "ignore",
	});
	const [code, output] = await Promise.all([check.exited, new Response(check.stdout).text()]);
	const value = output.trim();
	if (code !== 0 || (value !== "true" && value !== "false")) throw new Error("Unable to read alias status");
	return value === "true";
}

export async function openDocumentationFile(req: Request, root: string): Promise<Response> {
	if (req.headers.get("origin") !== `http://${req.headers.get("host")}`) {
		return new Response("Forbidden", { status: 403 });
	}
	if (req.headers.get("content-type")?.split(";")[0] !== "application/json") {
		return new Response("Expected JSON", { status: 415 });
	}
	const body = (await req.json().catch(() => null)) as { path?: unknown } | null;
	if (typeof body?.path !== "string") return new Response("Expected a file path", { status: 400 });
	const filename = openableExtensions.has(extname(body.path).toLowerCase())
		? await resolveDocumentationFile(root, body.path)
		: null;
	if (!filename) return new Response("Not Found", { status: 404 });
	const file = await lstat(filename).catch(() => null);
	if (!file?.isFile() || (process.platform !== "win32" && (file.mode & 0o111) !== 0)) {
		return new Response("Not Found", { status: 404 });
	}
	try {
		if (process.platform === "darwin" && (await isMacFinderAlias(filename))) {
			return new Response("Not Found", { status: 404 });
		}
		const command =
			process.platform === "win32"
				? [
						"powershell.exe",
						"-NoProfile",
						"-NonInteractive",
						"-Command",
						"Invoke-Item -LiteralPath $env:BACKLOG_FILE -ErrorAction Stop",
					]
				: [process.platform === "darwin" ? "/usr/bin/open" : "xdg-open", filename];
		const opener = Bun.spawn(command, {
			env: process.platform === "win32" ? { ...process.env, BACKLOG_FILE: filename } : process.env,
			stdout: "ignore",
			stderr: "ignore",
		});
		if ((await opener.exited) === 0) return new Response(null, { status: 204 });
	} catch {
		// Do not launch if the metadata check failed or report success if the opener failed.
	}
	return new Response("Could not open the original file", { status: 500 });
}
