import { type ComponentProps, createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { DocumentationFile } from "../../types";
import { useLocale } from "../contexts/LocaleContext";
import { apiClient } from "../lib/api";
import type MermaidMarkdown from "./MermaidMarkdown";
import Modal from "./Modal";

const DocumentationFilesContext = createContext<{
	files: DocumentationFile[];
	unavailable: boolean;
	showImage: (path: string, alt?: string) => void;
} | null>(null);

export function useDocumentationFiles() {
	const context = useContext(DocumentationFilesContext);
	if (!context) throw new Error("Documentation files must be rendered inside DocumentationFiles");
	return context;
}

function documentationImageUrl(path: string): string {
	return `/api/documentation-files/image?${new URLSearchParams({ path })}`;
}

const LinkedImageContext = createContext(false);

function DocumentationImage({ folder, src, alt, ...props }: ComponentProps<"img"> & { folder: string }) {
	const { t } = useLocale();
	const { files, showImage } = useDocumentationFiles();
	const linked = useContext(LinkedImageContext);
	const path = findDocumentationImage(files, folder, src);
	const image = <img {...props} src={path ? documentationImageUrl(path) : src} alt={alt ?? ""} />;
	if (!path || linked) return image;
	return (
		<button
			type="button"
			className="max-w-full cursor-zoom-in text-left"
			aria-label={t("docs.enlargeImage", { name: alt || filename(path) })}
			onClick={() => showImage(path, alt)}
		>
			{image}
		</button>
	);
}

function filename(path: string): string {
	return path.slice(path.lastIndexOf("/") + 1);
}

function findDocumentationImage(files: DocumentationFile[], folder: string, src: string | undefined): string | null {
	if (!src || /[:?#]/.test(src)) return null;
	try {
		const name = decodeURIComponent(src.replace(/^\.\//, ""));
		if (!name || /[\\/]/.test(name)) return null;
		const path = folder ? `${folder}/${name}` : name;
		return files.some((file) => file.kind === "image" && file.path === path) ? path : null;
	} catch {
		return null;
	}
}

type MarkdownNode = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: MarkdownNode[] };

function linkedImages(node: MarkdownNode): { src: string; alt?: string }[] {
	if (node.tagName !== "img") return node.children?.flatMap(linkedImages) ?? [];
	const { src, alt } = node.properties ?? {};
	return typeof src === "string" ? [{ src, alt: typeof alt === "string" ? alt : undefined }] : [];
}

type DocumentationImageLinkProps = ComponentProps<"a"> & {
	folder: string;
	images: ReturnType<typeof linkedImages>;
};

function DocumentationImageLink({ folder, images, ...props }: DocumentationImageLinkProps) {
	const { t } = useLocale();
	const { files, showImage } = useDocumentationFiles();
	const previews = new Map<string, string | undefined>();
	for (const { src, alt } of images) {
		const path = findDocumentationImage(files, folder, src);
		if (path) previews.set(path, alt);
	}
	return (
		<>
			{/* Keep the original link and place the zoom control beside it, not inside it. */}
			<LinkedImageContext.Provider value={true}>
				<a {...props} />
			</LinkedImageContext.Provider>
			{Array.from(previews, ([path, alt]) => {
				const label = t("docs.enlargeImage", { name: alt || filename(path) });
				return (
					<button
						key={path}
						type="button"
						className="mx-1 cursor-zoom-in rounded border px-1"
						title={label}
						aria-label={label}
						onClick={() => showImage(path, alt)}
					>
						<svg aria-hidden="true" className="inline h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<circle cx="10" cy="10" r="6" />
							<path d="m14.5 14.5 5 5M7 10h6m-3-3v6" />
						</svg>
					</button>
				);
			})}
		</>
	);
}

export function documentationMarkdownComponents(folder: string): NonNullable<ComponentProps<typeof MermaidMarkdown>["components"]> {
	return {
		img: ({ node: _node, ...props }) => <DocumentationImage folder={folder} {...props} />,
		a: ({ node, ...props }) => {
			const images = node ? linkedImages(node) : [];
			return images.length ? <DocumentationImageLink folder={folder} images={images} {...props} /> : <a {...props} />;
		},
	};
}

export function DocumentationFiles({ children }: { children: ReactNode }) {
	const { t } = useLocale();
	const [files, setFiles] = useState<DocumentationFile[]>([]);
	const [unavailable, setUnavailable] = useState(false);
	const [image, setImage] = useState<{ path: string; alt?: string; unavailable?: boolean } | null>(null);
	useEffect(() => {
		const controller = new AbortController();
		apiClient
			.fetchDocumentationFiles(controller.signal)
			.then(setFiles)
			.catch(() => {
				if (!controller.signal.aborted) setUnavailable(true);
			});
		return () => controller.abort();
	}, []);

	return (
		<DocumentationFilesContext.Provider value={{ files, unavailable, showImage: (path, alt) => setImage({ path, alt }) }}>
			{children}
			{image &&
				createPortal(
					<Modal isOpen onClose={() => setImage(null)} title={filename(image.path)} maxWidthClass="max-w-7xl">
						<div className="overflow-x-auto">
							{image.unavailable ? (
								<p role="alert">{t("docs.imageUnavailable")}</p>
							) : (
								<img
									className="max-w-none"
									src={documentationImageUrl(image.path)}
									alt={image.alt || filename(image.path)}
									onError={() => setImage({ ...image, unavailable: true })}
								/>
							)}
						</div>
					</Modal>,
					document.body,
				)}
		</DocumentationFilesContext.Provider>
	);
}
