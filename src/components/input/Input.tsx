import clsx from "clsx";

type Props = {
  className?: string;
  value?: string;
  defaultValue?: string;
  setValue?: (value: string) => void;
  isDisabled?: boolean;
};

const Input = ({
  className = "",
  value,
  defaultValue,
  setValue,
  isDisabled = false,
}: Props) => {
  return (
    <div
      className={clsx(
        "relative",
        "flex items-center w-full",
        "rounded-sm",
        "border-white border-2",
        "focus-within:border-[#fcff4e]",
        "duration-500",
        className,
      )}
    >
      <input
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => (setValue ? setValue(e.target.value || "") : {})}
        className={clsx(
          "w-full",
          "py-1.5 px-3",
          "text-sm",
          "bg-[#282824] rounded-sm",
          "caret-[#d8da51] text-white",
          "outline-none",
          {
            "opacity-45": isDisabled,
          },
        )}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;
