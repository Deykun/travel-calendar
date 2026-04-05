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

const Button = ({
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
      className={cn("p-2 bg-blue-300", className)}
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

export default Button;
