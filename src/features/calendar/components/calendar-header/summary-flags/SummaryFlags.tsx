import { useTranslation } from 'react-i18next';

import styles from './SummaryFlags.module.css';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { useFlagsSimple } from '@/features/filters/hooks/useFlagsSimple';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { cn } from '@/utils/tailwind';

import { Period } from '../../calendar/Period';

type Props = {
  onClose: () => void;
};

export function SummaryFlags({ onClose }: Props) {
  const countriesCodesByYear = useFiltersStore((store) => store.filtered.summary.countriesCodesByYear);
  const visitedCountriesTotal = useFiltersStore((store) => store.filtered.summary.countriesCodes.length);

  const { t } = useTranslation();

  const { flags } = useFlagsSimple(countriesCodesByYear, false);

  if (visitedCountriesTotal === 0) {
    return null;
  }

  return (
    <div key={flags.length} className={cn('col-span-4', 'p-5 py-3', 'bg-[#111110] rounded-lg')}>
      <Checkbox isActive onChange={() => onClose()}>
        {t('summary.countries', {
          postProcess: 'interval',
          count: visitedCountriesTotal,
        })}
      </Checkbox>
      <div className={cn('relative', 'w-full', 'max-w-full', styles['scroll-content-wrapper'])}>
        <div
          className={cn(
            'grid grid-flow-col justify-center-safe gap-3',
            'p-4 px-8',
            'overflow-auto',
            'snap-x snap-mandatory touch-pan-x',
          )}
        >
          {flags.reverse().map(({ countryCode, from, to }) => {
            return (
              <Period
                className="w-14 h-20 snap-center"
                key={`${countryCode}-${from}-${to}`}
                from={from}
                to={to}
                countryCode={countryCode}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
