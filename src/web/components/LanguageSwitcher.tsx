import React from 'react';
import { LOCALE_NAMES, SUPPORTED_LOCALES, type Locale } from '../../i18n/index.ts';
import { useLocale } from '../contexts/LocaleContext.tsx';

const LanguageSwitcher: React.FC = () => {
	const { locale, setLocale, t } = useLocale();

	return (
		<select
			aria-label={t('language.label')}
			title={t('language.label')}
			value={locale}
			onChange={(event) => setLocale(event.target.value as Locale)}
			className="px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400 transition-colors duration-200"
		>
			{SUPPORTED_LOCALES.map((supported) => (
				<option key={supported} value={supported}>
					{LOCALE_NAMES[supported]}
				</option>
			))}
		</select>
	);
};

export default LanguageSwitcher;
