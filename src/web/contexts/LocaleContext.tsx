import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
	DEFAULT_LOCALE,
	isSupportedLocale,
	translate,
	type Locale,
	type MessageKey,
	type MessageValues,
} from '../../i18n/index.ts';

const STORAGE_KEY = 'backlog-locale';

/**
 * A message value may be a live element, such as the task count that renders as a skeleton while
 * it loads. Plain messages take strings and numbers; a message with an element value uses
 * `tNode` instead.
 */
export type NodeValues = Record<string, React.ReactNode>;

export type Translate = (key: MessageKey, values?: MessageValues) => string;
export type TranslateNode = (key: MessageKey, values: NodeValues) => React.ReactNode;

interface LocaleContextValue {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: Translate;
	tNode: TranslateNode;
}

/**
 * Every component renders in English until a provider is mounted above it, so a component can be
 * used on its own, and in a browser test, without a locale provider.
 */
const defaultLocaleValue: LocaleContextValue = {
	locale: DEFAULT_LOCALE,
	setLocale: () => {},
	t: (key, values) => translate(DEFAULT_LOCALE, key, values),
	tNode: (key, values) => renderWithNodes(translate(DEFAULT_LOCALE, key), values),
};

const LocaleContext = createContext<LocaleContextValue>(defaultLocaleValue);

const readStoredLocale = (): Locale => {
	if (typeof localStorage === 'undefined') return DEFAULT_LOCALE;
	const saved = localStorage.getItem(STORAGE_KEY);
	return isSupportedLocale(saved) ? saved : DEFAULT_LOCALE;
};

export const useLocale = (): LocaleContextValue => useContext(LocaleContext);

/**
 * Replaces `{name}` placeholders with live elements.
 *
 * The message is split on its placeholders and the values are interleaved, so an element value
 * keeps its own position in the sentence instead of being stringified into it.
 */
function renderWithNodes(message: string, values: NodeValues): React.ReactNode {
	const parts = message.split(/(\{\w+\})/g);
	return parts.map((part, index) => {
		const match = part.match(/^\{(\w+)\}$/);
		if (!match) return part;
		const name = match[1] as string;
		const value = values[name];
		return value === undefined ? part : <React.Fragment key={index}>{value}</React.Fragment>;
	});
}

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

	useEffect(() => {
		document.documentElement.lang = locale;
		localStorage.setItem(STORAGE_KEY, locale);
	}, [locale]);

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next);
	}, []);

	const value = useMemo<LocaleContextValue>(
		() => ({
			locale,
			setLocale,
			t: (key, values) => translate(locale, key, values),
			tNode: (key, values) => renderWithNodes(translate(locale, key), values),
		}),
		[locale, setLocale],
	);

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
