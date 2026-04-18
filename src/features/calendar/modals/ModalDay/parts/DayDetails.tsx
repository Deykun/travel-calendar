import { ImageFlag } from "@/components/image-flag/ImageFlag";
import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  year: string;
  countryCode: string;
  tripsKeys: string[];
  setDetails: (params: { tripsKeys: string[]; countryCode: string }) => void;
};

export const DayDetails = ({
  className = "",
  year,
  countryCode,
  tripsKeys,
  setDetails,
}: Props) => {
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
          tripsKeys,
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
};
