import IconHome from "@/components/icons/IconHome";
import IconCheck from "@/components/icons/IconCheck";
import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  total: number;
  maxTotal?: number;
  shouldShowAllNumbers?: boolean;
};

export const Icon = ({
  className = "",
  shouldShowAllNumbers = false,
  total,
  maxTotal,
}: Props) => {
  const opacity =
    maxTotal && total > 0
      ? Math.abs(1 - Math.min(1, (total + 1) / maxTotal)).toFixed(1)
      : "0";

  return (
    <span
      className={cn(
        "relative",
        "inline-grid place-items-center",
        "size-6 rounded-lg",
        "leading-0",
        "transition-bounce",
        className,
        {
          "bg-[#272620] text-[#54544b]": total === 0,
          "bg-[#d8da51] text-black": total > 0,
        },
      )}
      style={{
        // @ts-expect-error Doesn't know css
        cornerShape: "superellipse(1.5)",
      }}
    >
      <span
        className="absolute top-0 left-0 size-full bg-black transition-bounce"
        style={{
          // @ts-expect-error Doesn't know css
          cornerShape: "inherit",
          borderRadius: "inherit",
          opacity,
        }}
      ></span>
      <span
        className={cn(
          "col-start-1 row-start-1 text-sm font-semibold relative z-1 opacity-0 transition-bounce",
          {
            "opacity-100": shouldShowAllNumbers || total > 1,
          },
        )}
      >
        {total === 0 ? "" : total}
      </span>
      <IconCheck
        className={cn(
          "col-start-1 row-start-1 size-6 relative z-1 opacity-0 scale-0 transition-bounce",
          {
            "opacity-100 scale-100": !shouldShowAllNumbers && total === 1,
          },
        )}
      />
      <IconHome
        className={cn(
          "col-start-1 row-start-1 size-4 relative z-1 opacity-0 scale-0 transition-bounce",
          {
            "opacity-100 scale-100": !shouldShowAllNumbers && total === 0,
          },
        )}
      />
    </span>
  );
};

export default Icon;
