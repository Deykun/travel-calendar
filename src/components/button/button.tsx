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
}: Props) => {
  const Tag = tagName || "button";

  return (
    <Tag
      className={cn(
        "py-3 px-6 bg-[#646455] rounded-full",
        "text-white text-sm font-semibold",
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
