import { capitalize } from "@/utils/text";
import { format } from "date-fns";
import { enGB, pl } from "date-fns/locale";
import { useMemo } from "react";

import { useTranslation } from "react-i18next";

type PropsDatetime = {
  date: string;
};

export function DatetimeDay({ date: dateLike }: PropsDatetime) {
  const { i18n } = useTranslation();

  const { date, locale, formatToUse } = useMemo(() => {
    const date = new Date(dateLike);

    if (i18n.language === "pl") {
      return {
        date,
        locale: pl,
        formatToUse: "do MMMM",
      };
    }

    return {
      date,
      locale: enGB,
      formatToUse: "MMMM do",
    };
  }, [dateLike, i18n.language]);

  if (!date) {
    return null;
  }

  return capitalize(format(date, formatToUse, { locale }));
}
