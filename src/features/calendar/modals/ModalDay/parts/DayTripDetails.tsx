import { PlaceName } from "@/features/calendar/components/PlaceName";
import useDataStore from "@/features/settings/stores/useDateStore";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";

type Props = {
  tripKey: string;
  showOnlyForCountryCode?: string;
};

export const DayTripDetails = ({ tripKey, showOnlyForCountryCode }: Props) => {
  const trip = useDataStore((store) => store.tripsByKey[tripKey]);
  const { t } = useTranslation();

  if (showOnlyForCountryCode && trip?.countryCode !== showOnlyForCountryCode) {
    return null;
  }

  if (!trip) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-1", "relative", "text-[#979797]")}>
      <strong className="text-white tracking-wider font-semibold">
        <PlaceName placeKey={trip?.placeKey} />
      </strong>
      <p className="text-[#979797] text-[10px] tracking-wider -mt-1 mb-1">
        {t(`country.name.${trip.countryCode}`)}
      </p>
      <p
        className={cn(
          "text-[#979797] text-[12px] text-right",
          "text-nowrap tracking-wider font-semibold",
          "mb-2",
        )}
      >
        {trip?.from} - {trip?.to}
      </p>
      <p
        className={cn(
          "text-white text-[10px] text-nowrap tracking-widest font-medium",
          "absolute top-2 right-0",
        )}
      >
        {trip?.days} days
      </p>
    </div>
  );
};
