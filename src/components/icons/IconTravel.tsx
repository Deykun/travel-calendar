import IconHome from "@/components/icons/IconHome";
import IconCheck from "@/components/icons/IconCheck";
import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  total: number;
  shouldShowAllNumbers?: boolean;
};

export const Icon = ({
  className = "",
  shouldShowAllNumbers = false,
  total,
}: Props) => {
  return (
    <span
      className={cn(
        "relative",
        "inline-flex items-center justify-center",
        "size-6 rounded-lg",
        "leading-0",
        className,
        {
          // "bg-[#d6d6d6] text-gray-400": total === 0,
          "bg-[#272620] text-[#54544b]": total === 0,
          "bg-[#d8da51] text-black": total > 0,
        },
      )}
      style={{
        cornerShape: "superellipse(1.5)",
      }}
    >
      {(shouldShowAllNumbers || total > 1) && (
        <span className="text-sm font-semibold">{total}</span>
      )}
      {!shouldShowAllNumbers && total === 1 && <IconCheck className="size-6" />}
      {!shouldShowAllNumbers && total === 0 && <IconHome className="size-4" />}
    </span>
  );
};

export default Icon;
