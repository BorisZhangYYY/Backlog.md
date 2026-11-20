import React from 'react';
import { LOCALE_NAMES, SUPPORTED_LOCALES } from '../../i18n/index.ts';
import { useLocale } from '../contexts/LocaleContext.tsx';
import ThemedSelect from './ThemedSelect';

const LanguageSwitcher: React.FC = () => {
	const { locale, setLocale, t } = useLocale();

	return (
		<ThemedSelect
			aria-label={t('language.label')}
			title={t('language.label')}
			value={locale}
			onChange={setLocale}
			className="h-8"
			options={SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_NAMES[value] }))}
		/>
	);
};

export default LanguageSwitcher;
