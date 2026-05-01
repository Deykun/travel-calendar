import { useCountryDays } from "@/hooks/useCountryDays";
import { Period } from "../calendar/Period";
import { TextCounter } from "@/components/text-counter/TextCounter";
import { cn } from "@/utils/tailwind";

type Props = {
  countryCode: string;
};

export function CountrySummary({ countryCode }: Props) {
  const { activeDays, daysInYear } = useCountryDays(countryCode);

  return (
    <Period countryCode={countryCode}>
      <span className="inline-grid place-items-center px-1">
        <TextCounter
          className={cn(
            "col-start-1 row-start-1",
            "opacity-0 group-hover:opacity-100",
            "font-normal text-[10px]",
            "transition-bounce",
          )}
          value={activeDays.length}
          max={daysInYear}
        />
        <TextCounter
          className={cn(
            "col-start-1 row-start-1",
            "opacity-100 group-hover:opacity-0",
            "duration-150",
            "transition-bounce",
          )}
          value={activeDays.length}
          max={daysInYear}
          variant="percent"
        />
      </span>
    </Period>
  );
}
