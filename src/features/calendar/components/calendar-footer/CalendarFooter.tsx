import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconCalendarSmile from '@/components/icons/IconCalendarSmile';
import IconGear from '@/components/icons/IconGear';
import IconTravel from '@/components/icons/IconTravel';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { CalendarFootnote } from '@/features/share/components/CalendarFootnote';
import { openSidebarSettings } from '@/features/sidebar/stores/useSidebarStore';
import { classNamesLayoutGap, classNamesLayoutGrid, classNamesLayoutPx } from '@/layouts/layout-app';
import { EMPTY_ARRAY } from '@/utils/empty';
import { cn } from '@/utils/tailwind';

import { CountrySummary } from '../calendar-header/CountrySummary';

export function CalendarFooter() {
  const integration = useDataStore((store) => store.integration);

  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY);

  const { t } = useTranslation();

  if (!integration.type) {
    return null;
  }

  return (
    <section className={cn(classNamesLayoutGap, classNamesLayoutPx, classNamesLayoutGrid, 'my-8', 'group')}>
      {homeCountriesCodes.length === 0 && (
        <div className="col-span-4 p-5">
          <div className="flex gap-8 items-center mb-4">
            <button
              type="button"
              className="inline-flex flex-col items-center gap-2"
              onClick={() => openSidebarSettings('home')}
            >
              <IconTravel total={0} classNameSize="size-8" />
              <span className="text-white font-semibold whitespace-nowrap">{t('preferences.homeCountry')}</span>
            </button>
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
          <div className="flex items-center gap-4">
            <small>{t('preferences.homeCountry.tip')}</small>
            <Button
              className={cn('shrink-0', 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100', 'duration-150')}
              size="sm"
              variant="secondary"
              onClick={() => openSidebarSettings('home')}
            >
              <IconGear />
            </Button>
          </div>
        </div>
      )}
      <div
        className={cn(
          'col-span-4',
          'p-5 pt-10 sm:pt-5',
          'bg-[#111110]',
          'flex items-center justify-between',
          'text-right',
          'rounded-lg',
        )}
      >
        <span
          className={cn('inline-grid place-items-center size-10', 'bg-[#d8da51] text-black', 'rounded-lg')}
          style={{
            // @ts-expect-error Doesn't know css
            cornerShape: 'superellipse(1.5)',
          }}
        >
          <IconCalendarSmile className="size-8" />
        </span>
        <CalendarFootnote />
      </div>
    </section>
  );
}
