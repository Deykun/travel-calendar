import { cn } from "@/utils/tailwind";

type Props = {
  tagName?: "button" | "a";
  type?: "submit" | "button";
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isInverted?: boolean;
  isText?: boolean;
  isLarge?: boolean;
  hasBorder?: boolean;
  dataTestId?: string;
  variant?: "primary" | "secondary";
};

export const Button = ({
  className = "",
  type,
  tagName,
  children,
  onClick,
  href,
  target,
  rel,
  isDisabled = false,
  dataTestId,
  variant = "primary",
}: Props) => {
  const Tag = tagName || "button";

  return (
    <Tag
      className={cn(
        "group",
        "inline-flex",
        "items-center gap-2",
        "[&>svg]:shrink-0 [&>svg]:size-6",
        "[&>svg]:first:-ml-1.5",
        "[&>svg]:last:-mr-1.5",
        "py-2 px-4 rounded-xl",
        "border-2 border-[#d8da51]",
        "text-black",
        "text-sm font-medium",
        "transition-bounce",
        {
          "bg-[#d8da51] text-black hover:bg-[#fcff4e] hover:border-[#fcff4e]":
            variant === "primary",
          "bg-transparent text-[#d8da51] hover:text-[#fcff4e] hover:border-[#fcff4e]":
            variant === "secondary",
        },
        className,
      )}
      type={type}
      onClick={onClick}
      href={href}
      rel={rel}
      target={target}
      disabled={isDisabled}
      data-testid={dataTestId}
    >
      {children}
    </Tag>
  );
};
