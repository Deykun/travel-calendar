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
          "bg-gray-400 text-gray-700 text-white bg-[linear-gradient(45deg,transparent,#616d80,#616d80)]":
            total === 0,
          "bg-green-800 text-white bg-[linear-gradient(45deg,transparent,#108a49,#108a49)]":
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
