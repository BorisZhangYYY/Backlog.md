import type { Document, DocumentationFile } from "../../types";

/**
 * Represents a folder node in the docs tree structure.
 * Each node contains docs directly in this folder and nested subfolders.
 */
export interface DocsTreeNode {
	/** Folder name (e.g., "guides") */
	name: string;
	/** Full folder path (e.g., "guides/auth") */
	path: string;
	/** Docs directly in this folder */
	docs: Document[];
	files: DocumentationFile[];
	/** Nested subfolders */
	children: DocsTreeNode[];
}

/**
 * Result of building the docs tree structure.
 * Contains the hierarchical tree and any docs without folder paths.
 */
export interface DocsTreeResult {
	/** Top-level folder nodes */
	tree: DocsTreeNode[];
	/** Docs without folder path */
	ungroupedDocs: Document[];
	ungroupedFiles: DocumentationFile[];
}

const byTitle = (a: Document, b: Document) => a.title.localeCompare(b.title);
const byPath = (a: DocumentationFile, b: DocumentationFile) => a.path.localeCompare(b.path);
const parentFolder = (path?: string): string => path?.split("/").slice(0, -1).join("/") ?? "";

/**
 * Builds a hierarchical tree structure from a flat list of documents.
 *
 * - Documents with a folder in their `path` are organized into nested folders
 * - Documents without a folder path are returned as ungrouped
 * - Folders and documents are sorted alphabetically
 *
 * @param docs - Array of documents to organize
 * @returns Tree structure and ungrouped documents
 */
export function buildDocsTree(docs: Document[], files: DocumentationFile[] = []): DocsTreeResult {
	const tree: DocsTreeNode[] = [];
	const foldersByPath = new Map<string, DocsTreeNode>();
	const ungroupedDocs: Document[] = [];
	const ungroupedFiles: DocumentationFile[] = [];

	const getFolder = (folderPath: string): DocsTreeNode => {
		const existing = foldersByPath.get(folderPath);
		if (existing) {
			return existing;
		}
		const separatorIndex = folderPath.lastIndexOf("/");
		const node: DocsTreeNode = {
			name: folderPath.slice(separatorIndex + 1),
			path: folderPath,
			docs: [],
			files: [],
			children: [],
		};
		foldersByPath.set(folderPath, node);
		if (separatorIndex === -1) {
			tree.push(node);
		} else {
			getFolder(folderPath.slice(0, separatorIndex)).children.push(node);
		}
		return node;
	};

	for (const doc of docs) {
		// Everything before the last path segment (the filename) is the folder path.
		const folderPath = parentFolder(doc.path);
		if (folderPath === "") {
			ungroupedDocs.push(doc);
		} else {
			getFolder(folderPath).docs.push(doc);
		}
	}
	for (const file of files) {
		const folderPath = parentFolder(file.path);
		(folderPath ? getFolder(folderPath).files : ungroupedFiles).push(file);
	}

	ungroupedDocs.sort(byTitle);
	ungroupedFiles.sort(byPath);
	sortTree(tree);
	return { tree, ungroupedDocs, ungroupedFiles };
}

/**
 * Recursively sorts folders and docs alphabetically.
 */
function sortTree(nodes: DocsTreeNode[]): void {
	nodes.sort((a, b) => a.name.localeCompare(b.name));
	for (const node of nodes) {
		node.docs.sort(byTitle);
		node.files.sort(byPath);
		sortTree(node.children);
	}
}
