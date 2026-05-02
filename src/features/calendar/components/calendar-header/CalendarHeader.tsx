import useFiltersStore from '@/features/filters/stores/useFilterStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { classNamesLayoutGap, classNamesLayoutGrid, classNamesLayoutPx } from '@/layouts/layout-app';
import { getArrayOfYears } from '@/utils/date';
import { cn } from '@/utils/tailwind';

export function CalendarHeader() {
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const activeTo = useFiltersStore((store) => store.activeFilters.to);
  const { from, to } = useDataStore((store) => store.date);

  const years = getArrayOfYears(activeFrom ?? from, activeTo ?? to);
  const totalYears = years.length;

  return (
    <header className={cn(classNamesLayoutGap, classNamesLayoutPx, classNamesLayoutGrid, 'mb-8')}>
      <div className={cn('col-span-2', 'p-5 pt-3', 'bg-[#111110]', 'text-center', 'rounded-lg')}>
        <div className={cn('grid text-center text-[150px] leading-none font-semibold')}>
          {years.map((year) => (
            <span
              className={cn('col-start-1 row-start-1 text-white', 'transition-bounce', 'tabular-nums')}
              style={{
                opacity: totalYears === 1 ? 1 : Math.min(0.7, 2.25 / totalYears).toFixed(2),
              }}
            >
              {year}
            </span>
          ))}
        </div>
      </div>
      <div className={cn('col-span-2', 'p-5 pt-3', 'bg-[#111110]', 'text-center', 'rounded-lg')}>Stats</div>
    </header>
  );
}
