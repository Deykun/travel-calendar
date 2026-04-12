import { ImageFlag } from "@/components/image-flag/ImageFlag";
import useDataStore from "@/features/integrations/stores/use-data-store";
import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  dateWithYear: string;
  setDetails: (params: { tripsKeys: string[]; countryCode: string }) => void;
};

export const DayDetails = ({ className = '', dateWithYear, setDetails }: Props) => {
  const [year] = dateWithYear.split("-");
  const x = useDataStore((store) => store.dataByDay[dateWithYear]);

  return (
    <>
      {x?.countriesCodes.map((countryCode) => {
        return (
          <button
            className={cn(
              "inline-flex items-center flex-col gap-1",
              "p-1",
              "rounded-2xl",
              "duration-150",
              "group",
              "text-gray-600",
              "hover:bg-[#fbff0030] hover:text-[#737102]",
              className,
            )}
            onClick={() =>
              setDetails({
                tripsKeys: x.tripsKeys,
                countryCode,
              })
            }
          >
            <ImageFlag countryCode={countryCode} />
            <div className="mt-1 text-[12px] text-nowrap tracking-widest font-semibold">
              {year}
            </div>
          </button>
        );
      })}
    </>
  );
};
