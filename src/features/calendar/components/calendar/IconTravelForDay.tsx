import IconTravel from '@/components/icons/IconTravel';
import { useMaxTotal } from '@/features/filters/hooks/useMaxTotal';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';

type Props = {
  total: number;
  hasScale?: boolean;
};

export const IconTravelForDay = ({ total, hasScale = false }: Props) => {
  const shouldShowAllNumbers = usePreferencesStore((store) => store.calendar.counterShouldShow === 'orderOfUnlocking');
  const shouldCounterUseScale = usePreferencesStore((store) => store.calendar.shouldCounterUseScale);

  const maxTotal = useMaxTotal();

  return (
    <IconTravel
      total={total}
      maxTotal={hasScale && shouldCounterUseScale ? maxTotal : undefined}
      shouldShowAllNumbers={shouldShowAllNumbers}
    />
  );
};
