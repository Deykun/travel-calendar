import IconTravel from '@/components/icons/IconTravel';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import usePreferencesStore, { type PreferencesStoreState } from '@/features/preferences/stores/usePreferencesStore';

type Props = {
  total: number;
  counterShouldShow: PreferencesStoreState['calendar']['counterShouldShow'];
};

export const IconTravelForDay = ({ total, counterShouldShow }: Props) => {
  const shouldCounterUseScale = usePreferencesStore((store) => store.calendar.shouldCounterUseScale);

  const maxTotal = useFiltersStore((store) =>
    counterShouldShow === 'numberOfCountries'
      ? store.filtered.summary.maxCountriesInDay
      : store.filtered.summary.maxYearsAbroadInDay,
  );

  return <IconTravel total={total} maxTotal={shouldCounterUseScale ? maxTotal : undefined} />;
};
