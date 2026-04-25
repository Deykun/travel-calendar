import useDataStore from "@/features/settings/stores/useDateStore";
import { MiniCalendar } from "./MiniCalendar";
import { useTranslation } from "react-i18next";
import { ImageFlag } from "@/components/image-flag/ImageFlag";

type Props = {
  countryCode: string;
};

export function MiniCalendarForCountry({ countryCode }: Props) {
  const activeDays = useDataStore((store) => store.daysByCountry[countryCode]);
  const { t } = useTranslation();

  if (!activeDays) {
    return null;
  }

  return (
    <MiniCalendar activeDays={activeDays}>
      <div className="flex gap-2 justify-center items-center">
        <ImageFlag countryCode={countryCode} />
        <span>{t(`country.name.${countryCode}`)}</span>
      </div>
    </MiniCalendar>
  );
}
