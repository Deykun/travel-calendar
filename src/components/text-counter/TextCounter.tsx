import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  value: number;
  max: number;
  variant?: "slash" | "percent";
  shouldForceActive?: boolean;
};

export const TextCounter = ({
  className = "",
  value,
  max,
  variant = "slash",
  shouldForceActive = false,
}: Props) => {
  if (variant === "percent") {
    return (
      <span
        className={cn(
          "text-xs tracking-wider",
          "text-[#fcff4e] font-semibold",
          className,
        )}
      >
        {((value / max) * 100).toFixed(1)}%
      </span>
    );
  }

  return (
    <span
      className={cn(
        "text-xs text-gray-400 tracking-wider",
        {
          "text-[#fcff4e] font-semibold": value === max,
        },
        className,
      )}
    >
      {value} / {max}
    </span>
  );
};
