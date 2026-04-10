import IconTravel from "@/components/icons/IconTravel";
import { ImageFlag } from "@/components/image-flag/ImageFlag";
import useDataStore from "@/features/integrations/stores/use-data-store";
import { useFlagsFromCountries } from "@/hooks/useFlagsFromCountries";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
  dayKey: string;
};

const EMPTY_ARRAY: string[] = [];

export const ModalDay = ({ className, dayKey }: Props) => {
  const [month, day] = dayKey.split("-").map(Number);
  const countriesCodes = useDataStore(
    (store) => store.summaryByDay[dayKey]?.countriesCodes || EMPTY_ARRAY,
  );
  const countriesCodesByYear = useDataStore(
    (store) => store.summaryByDay[dayKey]?.countriesCodesByYear,
  );

  const { abroad, home } = useFlagsFromCountries(countriesCodesByYear);

  const maxCountriesInDay = useDataStore(
    (store) => store.summary.maxCountriesInDay,
  );

  const { t } = useTranslation();

  const total = countriesCodes.filter((country) => country !== "pl").length;

  if (!dayKey) {
    return null;
  }

  return null;

  return (
    <div
      className={cn(
        "rounded-xl",
        "bg-[#e7eff4]",
        "bg-[linear-gradient(45deg,transparent,white,white)]",
        "text-center relative",
        "drop-shadow-md",
        "relative hover:z-10",
        "min-w-[400px] min-h-[150px]",
        "border-4 border-[#d1cac5]",
        className,
      )}
    >
      <h2 className="text-xl font-semibold mb-4">
        {day} | {t(`month.name.${month}`)}
      </h2>
      <strong>{total}</strong>
      {/* <span> */}
      {/* <FlagHover countriesCodesByYear={countriesCodesByYear}> */}
      {/* <IconTravel total={total} /> */}
      {/* </FlagHover> */}
      {/* </span> */}
      {/* {day}.{month} */}
      <div className="flex flex-row gap-2">
        {abroad.map((flag) => (
          <ImageFlag key={flag.countryCode} flag={flag} />
        ))}
      </div>
      <img
        className={cn("absolute bottom-0 right-0 max-h-full", "rounded-xl saturate-150")}
        src="/images/map.jpg"
      />
      {/* <div className="flex flex-row gap-2">
        {home.map((flag) => (
          <ImageFlag key={flag.countryCode} flag={flag} />
        ))}
      </div> */}
      {/* {dayKey} */}
    </div>
  );
};
