import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { Period } from '@/features/calendar/components/calendar/Period';
import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import { cn } from '@/utils/tailwind';

export type PanelFrom = 'top-left' | 'top-center' | 'top-right' | 'bottom-left';

type Props = {
  flags?: FlagData[];
  title?: string;
  from: PanelFrom;
};

export const FlagHoverPanel = ({ flags = [], title, from }: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  if (flags.length === 0) {
    return null;
  }

  const isTop = ['top-left', 'top-center', 'top-right'].includes(from);
  const isBottom = ['bottom-left'].includes(from);
  const isLeft = ['top-left'].includes(from);
  const isRight = ['top-right'].includes(from);

  return (
    <div
      className={cn(
        'absolute',
        'z-10',
        'pointer-events-none',
        'rounded-md',
        'p-2',
        'opacity-0 group-hover:opacity-100',
        'drop-shadow',
        'duration-150',
        'bg-black',
        {
          'bottom-full origin-bottom': isTop,
          'translate-y-3 group-hover:-translate-y-4': isTop,
          'top-full origin-top': isBottom,
          '-translate-y-3 group-hover:translate-y-4': isBottom,
          'left-1/2 -translate-x-1/2': from === 'top-center',
          'left-0 -translate-x-6': isLeft,
          'right-0 translate-x-6': isRight,
        },
      )}
    >
      {title && <h4 className="text-[9px] font-bold">{t(title)}</h4>}
      <div
        className={cn('flex gap-y-1 gap-x-3 justify-center', {
          'w-48 flex-wrap': flags.length > 3,
        })}
      >
        {flags.map(({ countryCode, from, to }) => {
          return (
            <Period
              className="w-14 h-20"
              key={`${countryCode}-${from}-${to}`}
              from={from}
              to={to}
              countryCode={countryCode}
            />
          );
        })}
      </div>
    </div>
  );
};
