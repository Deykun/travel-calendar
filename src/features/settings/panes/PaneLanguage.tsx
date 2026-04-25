import { closeModal } from "@/features/modal/stores/use-modal-store";

import { Datetime } from "@/components/datetime/datetime";
import { useState } from "react";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/tailwind";
import IconBolt from "@/components/icons/IconBolt";
import Input from "@/components/input/Input";
import { useTranslation } from "react-i18next";
import useDataStore from "../stores/useDateStore";
import { getDataFromNomads } from "../actions/get-data-from-nomads";
import { SUPPORTED_LANGS } from "@/i18n";
import IconBubble from "@/components/icons/IconBubble";

const modalStyles = cn("rounded-lg", "p-4", "bg-black border border-[#2b2b27]");

export function PaneLanguage() {
  const { i18n } = useTranslation();

  return (
    <div className={cn(modalStyles, "flex flex-wrap gap-2")}>
      {SUPPORTED_LANGS.map((lang) => (
        <Button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          variant={lang === i18n.language ? "primary" : "secondary"}
        >
          <IconBubble />
          <span className="uppercase">{lang}</span>
        </Button>
      ))}
    </div>
  );
}
