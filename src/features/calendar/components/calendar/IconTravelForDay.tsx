import IconForward from '@/components/icons/IconForward';
import IconPlaneTransit from '@/components/icons/IconPlaneTransit';
import IconPlus from '@/components/icons/IconPlus';
import IconTransit from '@/components/icons/IconTransit';
import IconTravel from '@/components/icons/IconTravel';
import IconTravelWrapper from '@/components/icons/IconTravelWrapper';
import { useMaxTotal } from '@/features/filters/hooks/useMaxTotal';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import { cn } from '@/utils/tailwind';

type Props = {
  total: number;
  hasScale?: boolean;
  isNewCountryActive?: boolean;
  isHighlightAbroadTravelActive?: boolean;
};

export const IconTravelForDay = ({
  total,
  hasScale = false,
  isNewCountryActive = false,
  isHighlightAbroadTravelActive = false,
}: Props) => {
  const shouldCounterUseScale = usePreferencesStore((store) => store.calendar.shouldCounterUseScale);

  const maxTotal = useMaxTotal();

  return (
    <IconTravel total={total} maxTotal={hasScale && shouldCounterUseScale ? maxTotal : undefined}>
      {isHighlightAbroadTravelActive && (
        <IconTravelWrapper
          className={cn(
            'absolute -bottom-2 -left-2 z-1 size-3.75',
            'bg-[#4173b3] text-black',
            'starting:scale-0 scale-100',
            'starting:opacity-0 opacity-100',
            'duration-150 ease-in-out',
          )}
        >
          <IconForward />
        </IconTravelWrapper>
      )}
      {isNewCountryActive && (
        <IconTravelWrapper
          className={cn(
            'absolute -bottom-2 -right-2 z-1 size-3.75',
            'bg-[#178001] text-white',
            'starting:scale-0 scale-100',
            'starting:opacity-0 opacity-100',
            'duration-150 ease-in-out',
          )}
        >
          <IconPlus />
        </IconTravelWrapper>
      )}
    </IconTravel>
  );
};
