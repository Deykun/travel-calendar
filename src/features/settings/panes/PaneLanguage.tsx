import { useTranslation } from 'react-i18next';

import { Radiobox } from '@/components/radiobox/Radiobox';
import { LOCAL_STORAGE } from '@/constants';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { SUPPORTED_LANGS } from '@/i18n';

type Props = {
  className?: string;
};

export function PaneLanguage({ className }: Props) {
  const { i18n, t } = useTranslation();

  const handleChange = (newLanguage: string) => {
    localStorage.setItem(LOCAL_STORAGE.PICKED_LANGUAGE, newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Pane className={className}>
      <Pane.Title>{t('preferences.language.title')}</Pane.Title>
      <Pane.List>
        {SUPPORTED_LANGS.map((lang) => (
          <Radiobox key={lang} isActive={lang === i18n.language} onChange={() => handleChange(lang)}>
            {t(`preferences.language.current`, { lng: lang })}
          </Radiobox>
        ))}
      </Pane.List>
    </Pane>
  );
}
