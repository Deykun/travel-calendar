import { useTranslation } from 'react-i18next';

import IconTravel from '@/components/icons/IconTravel';
import { ImageFlag } from '@/components/image-flag/ImageFlag';
import { TextCounter } from '@/components/text-counter/TextCounter';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { getDayKey } from '@/features/settings/utils/get-day-key';
import { useCountryDays } from '@/hooks/useCountryDays';
import { EMPTY_ARRAY } from '@/utils/empty';
import { roundWithPrecision } from '@/utils/math';
import { cn } from '@/utils/tailwind';

import { DAYS_GROUPED_BY_MONTHS_BY_DAYS_IN_YEAR } from '../utils/get-days';

type Props = {
  className?: string;
  countryCode: string;
};

const sidebarStyles = cn('rounded-lg', 'p-4', 'bg-black border border-[#2b2b27]');

export const SidebarCountry = ({ className, countryCode }: Props) => {
  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY);

  const { t } = useTranslation();

  const { activeDays, daysInYear } = useCountryDays(countryCode);

  if (!countryCode) {
    return null;
  }

  return (
    <div className={cn('text-center relative', sidebarStyles, className)} data-sidebar="country">
      <div className="flex justify-center mb-3">
        <ImageFlag countryCode={countryCode} shouldShowHomeMarker={homeCountriesCodes.includes(countryCode)} />
      </div>
      <TextCounter className="absolute top-5 left-5" value={activeDays.length} max={daysInYear} variant="percent" />
      <TextCounter className="absolute top-5 right-5" value={activeDays.length} max={daysInYear} variant="slash" />
      <h2 className="text-2xl text-white font-semibold mb-5">{t(`country.name.${countryCode.toLowerCase()}`)}</h2>
      <div className="grid grid-cols-4 gap-2">
        {DAYS_GROUPED_BY_MONTHS_BY_DAYS_IN_YEAR[daysInYear].map((month) => (
          <div key={month.monthNumber} className={cn('p-1.5 bg-[#3d3d3d6e] rounded-sm')}>
            <strong className="block mb-2 text-[8px] tracking-wider font-semibold">{t(month.name)}</strong>
            <div className={cn('grid grid-cols-7 gap-x-1 gap-y-1')}>
              {month.days.map((day) => (
                <span
                  key={day}
                  className={cn('inline-flex size-1.5 rounded-xs', 'bg-[#272620]', {
                    'bg-[#d8da51]': activeDays.includes(getDayKey({ day, month: month.monthNumber })),
                  })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
