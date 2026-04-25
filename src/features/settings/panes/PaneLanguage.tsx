import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "@/i18n";
import { Radiobox } from "@/components/radiobox/Radiobox";

const sidebarStyles = cn(
  "rounded-lg",
  "p-4",
  "bg-black border border-[#2b2b27]",
);

export function PaneLanguage() {
  const { i18n } = useTranslation();

  return (
    <div className={cn(sidebarStyles, "flex flex-col gap-2")}>
      <h2>Language</h2>
      {SUPPORTED_LANGS.map((lang) => (
        <Radiobox
          key={lang}
          isActive={lang === i18n.language}
          onChange={() => i18n.changeLanguage(lang)}
        >
          <span className="uppercase">{lang}</span>
        </Radiobox>
      ))}
    </div>
  );
}
