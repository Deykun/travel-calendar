import { useTranslation } from 'react-i18next';

import IconTravel from '@/components/icons/IconTravel';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { classNamesLayoutGap, classNamesLayoutGrid, classNamesLayoutPx } from '@/layouts/layout-app';
import { EMPTY_ARRAY } from '@/utils/empty';
import { cn } from '@/utils/tailwind';

import { CountrySummary } from '../calendar-header/CountrySummary';

export function CalendarFooter() {
  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY);

  const { t } = useTranslation();

  if (homeCountriesCodes.length === 0) {
    return null;
  }

  return (
    <section className={cn(classNamesLayoutGap, classNamesLayoutPx, classNamesLayoutGrid, 'mb-8')}>
      <div className="mt-8 col-span-4 p-5">
        <div className="flex gap-8 items-center mb-4">
          <span className="inline-flex flex-col items-center gap-2">
            <IconTravel total={0} classNameSize="size-8" />
            <span className="text-white font-semibold whitespace-nowrap">{t('preferences.homeCountry')}</span>
          </span>
          <div
            className={cn(
              'w-full grid grid-cols-[repeat(auto-fit,70px)]',
              'place-items-start gap-x-8 gap-y-3 items-center',
            )}
          >
            {homeCountriesCodes.map((countryCode) => (
              <span key={countryCode} className="w-full inline-flex justify-center align-middle">
                <CountrySummary countryCode={countryCode} />
              </span>
            ))}
          </div>
        </div>
        <small>{t('preferences.homeCountry.tip')}</small>
      </div>
    </section>
  );
}
