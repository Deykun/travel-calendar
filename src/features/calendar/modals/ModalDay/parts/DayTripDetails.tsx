import IconTravel from "@/components/icons/IconTravel";
import { ImageFlag } from "@/components/image-flag/ImageFlag";
import { PlaceName } from "@/features/calendar/components/PlaceName";
import useFiltersStore from "@/features/filters/stores/use-filter-store";
import useDataStore from "@/features/integrations/stores/use-data-store";
import { closeOverModal } from "@/features/over-modal/stores/use-hover-modal-store";
import { useFlagsFromCountries } from "@/hooks/useFlagsFromCountries";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";

type Props = {
  tripKey: string;
  showOnlyForCountryCode?: string;
};

export const DayTripDetails = ({ tripKey, showOnlyForCountryCode }: Props) => {
  const trip = useDataStore((store) => store.tripsByKey[tripKey]);

  if (showOnlyForCountryCode && trip?.countryCode !== showOnlyForCountryCode) {
    return null;
  }

  if (!trip) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 text-[#979797]">
      <strong className="text-white font-semibold">
        <PlaceName placeKey={trip?.placeKey} />
      </strong>
      <br />
      <p className={cn("text-[#979797] text-[12px] text-nowrap tracking-widest font-semibold", "mb-2")}>
        {trip?.from?.slice(-5)} - {trip?.to?.slice(-5)}
      </p>
      <p className="text-white text-[10px] text-nowrap tracking-widest font-medium">
        {trip?.days} days
      </p>
    </div>
  );
};
