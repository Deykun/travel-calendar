import { cn } from "@/utils/tailwind";
import IconCheckboxFrame from "../icons/IconCheckboxFrame";
import IconCheck from "../icons/IconCheck";

type Props = {
  isActive?: boolean;
  onChange: (value: boolean) => void;
  frameIcon?: React.ElementType;
};

export const Checkbox = ({ onChange, isActive, frameIcon }: Props) => {
  const Frame = frameIcon ?? IconCheckboxFrame;

  return (
    <button
      className={cn(
        "relative size-6 p-1 rounded-sm",
        {
          "text-gray-400 bg-[#d6d6d6] hover:bg-[#d8da51]": !isActive,
          "text-black bg-[#d8da51] hover:bg-[#d6d6d6]": isActive,
        },
        "duration-300",
      )}
      onClick={() => onChange(!isActive)}
    >
      <Frame
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "size-5",
          "duration-300",
          {
            "scale-0 opacity-0": isActive,
            "scale-100 opacity-100": !isActive,
          },
        )}
      />
      <IconCheck
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "size-5",
          "duration-300",
          {
            "scale-0 opacity-0": !isActive,
            "scale-100 opacity-100": isActive,
          },
        )}
      />
    </button>
  );
};
