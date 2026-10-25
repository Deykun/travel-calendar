import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import { cn } from '@/utils/tailwind';

import { ImageFlagSimple } from '../image-flag/ImageFlagSimple';

type Props = {
  flags?: FlagData[];
};

export const FlagStack = ({ flags = [] }: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  const numberOfFlags = flags.length;

  if (numberOfFlags === 0) {
    return null;
  }

  return (
    <div className={cn('inline-grid place-items-center', 'h-6')}>
      {flags.map(({ countryCode }, index) => {
        const offset = numberOfFlags - index;
        const scalePower = 1 - index / (numberOfFlags - 1);
        const scale = 1 - scalePower * 0.3;

        return (
          <ImageFlagSimple
            key={countryCode}
            className={cn('col-start-1 row-start-1', 'w-8', 'border-3 border-[#232323aa]')}
            style={{ transform: `translateY(-${offset * 5}px) scale(${scale})`, transformOrigin: 'top center' }}
            countryCode={countryCode}
          />
        );
      })}
    </div>
  );
};
