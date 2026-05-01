import useDataStore from "@/features/settings/stores/useDateStore";
import { MiniCalendar } from "./MiniCalendar";
import { useTranslation } from "react-i18next";
import { ImageFlag } from "@/components/image-flag/ImageFlag";
import { useMemo } from "react";

type Props = {
  countryCode: string;
};

export function MiniCalendarForCountry({ countryCode }: Props) {
  const activeDays = useDataStore((store) => store.daysByCountry[countryCode]);
  const { t } = useTranslation();

  const daysInYear: 365 | 366 = useMemo(() => {
    if (!activeDays) {
      return 366;
    }

    if (activeDays.length === 366) {
      return 366;
    }

    const hasFeb29 = activeDays.includes("02-29");
    if (hasFeb29) {
      return 366;
    }

    return 365;
  }, [activeDays]);

  if (!activeDays) {
    return null;
  }

  return (
    <MiniCalendar activeDays={activeDays} daysInYear={daysInYear}>
      <div className="flex gap-2 justify-center items-center -mt-2">
        <ImageFlag countryCode={countryCode} />
        <span>{t(`country.name.${countryCode}`)}</span>
      </div>
    </MiniCalendar>
  );
}
