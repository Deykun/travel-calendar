import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "@/i18n";
import { Radiobox } from "@/components/radiobox/Radiobox";
import { Pane } from "@/features/sidebar/components/pane/Pane";

type Props = {
  className?: string;
};

export function PaneLanguage({ className }: Props) {
  const { i18n, t } = useTranslation();

  return (
    <Pane className={className}>
      <Pane.Title>{t("preferences.language.title")}</Pane.Title>
      <Pane.List>
        {SUPPORTED_LANGS.map((lang) => (
          <Radiobox
            key={lang}
            isActive={lang === i18n.language}
            onChange={() => i18n.changeLanguage(lang)}
          >
            {t(`preferences.language.current`, { lng: lang })}
          </Radiobox>
        ))}
      </Pane.List>
    </Pane>
  );
}
