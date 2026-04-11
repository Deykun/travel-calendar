import IconHome from "@/components/icons/IconHome";
import IconCheck from "@/components/icons/IconCheck";
import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  total: number;
};

export const Icon = ({ className = "", total }: Props) => {
  return (
    <span
      className={cn(
        "relative",
        "inline-flex items-center justify-center",
        "size-6 rounded-lg",
        "leading-0",
        className,
        {
          "bg-[#d6d6d6] text-gray-400 bsg-[linear-gradient(45deg,transparent,#616d80,#616d80)]":
            total === 0,
          "bg-[#d8da51] text-black bsg-[linear-gradient(45deg,transparent,#d8da51,#d8da51)]":
            total > 0,
        },
      )}
    >
      {total > 1 && <span className="text-sm font-semibold">{total}</span>}
      {total === 1 && <IconCheck className="size-6" />}
      {total === 0 && <IconHome className="size-4" />}
    </span>
  );
};

export default Icon;
