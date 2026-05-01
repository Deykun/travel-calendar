import { MiniCalendar } from "./MiniCalendar";
import { useTranslation } from "react-i18next";
import { ImageFlag } from "@/components/image-flag/ImageFlag";

import { useCountryDays } from "@/hooks/useCountryDays";

type Props = {
  countryCode: string;
};

export function MiniCalendarForCountry({ countryCode }: Props) {
  const { t } = useTranslation();

  const { activeDays, daysInYear } = useCountryDays(countryCode);

  return (
    <MiniCalendar activeDays={activeDays} daysInYear={daysInYear}>
      <div className="flex gap-2 justify-center items-center -mt-2">
        <ImageFlag countryCode={countryCode} />
        <span>{t(`country.name.${countryCode}`)}</span>
      </div>
    </MiniCalendar>
  );
}
