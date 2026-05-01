import { ImageFlag } from "@/components/image-flag/ImageFlag";
import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";

type Props = {
  className?: string;
  from?: number;
  to?: number;
  countryCode: string;
  onClick?: () => void;
  isActive?: boolean;
};

export const Period = ({
  className = "",
  from,
  to,
  countryCode,
  onClick,
  isActive = false,
  children,
}: PropsWithChildren<Props>) => {
  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      className={cn(
        "inline-flex items-center flex-col gap-1",
        "p-1 pt-2",
        "rounded-sm",
        "duration-150",
        "group",
        {
          "text-[#979797] hover:bg-[#fffb000d] hover:text-white": !isActive,
          "text-white bg-[#fff3] shadow-[0_0_15px_#021019]": isActive,
        },
        className,
      )}
      onClick={onClick}
    >
      <ImageFlag countryCode={countryCode} />
      <div className="mt-1 text-[12px] text-nowrap text-white tracking-widest font-semibold">
        {from === to && from}
        {from !== to && (
          <div className="text-[8px] -mt-0.5">
            {from} <br /> {to}
          </div>
        )}
        {children}
      </div>
    </Tag>
  );
};
