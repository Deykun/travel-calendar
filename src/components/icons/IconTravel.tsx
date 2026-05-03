import styles from './IconTravel.module.css';

import IconCheck from '@/components/icons/IconCheck';
import IconHome from '@/components/icons/IconHome';
import { cn } from '@/utils/tailwind';

type Props = {
  className?: string;
  total: number;
  maxTotal?: number;
  shouldShowAllNumbers?: boolean;
  classNameSize?: string;
};

export const Icon = ({
  className = '',
  shouldShowAllNumbers = false,
  total,
  maxTotal,
  classNameSize = 'size-6',
}: Props) => {
  const opacity = maxTotal && total > 0 ? Math.abs(1 - Math.min(1, (total + 0.75) / (maxTotal + 1))).toFixed(1) : '0';

  return (
    <span
      className={cn(
        'relative',
        'inline-grid place-items-center',
        'rounded-lg',
        'leading-0',
        'duration-500',
        className,
        classNameSize,
        {
          'bg-[#272620] text-[#54544b]': total === 0,
          'text-black': total > 0,
        },
      )}
      style={{
        // @ts-expect-error Doesn't know css
        cornerShape: 'superellipse(1.5)',
      }}
    >
      <span
        className={cn('absolute top-0 left-0 size-full bg-[#d8da51] scale-0 duration-500', {
          'scale-100': total > 0,
        })}
        style={{
          // @ts-expect-error Doesn't know css
          cornerShape: 'inherit',
          borderRadius: 'inherit',
        }}
      ></span>
      <span
        className={cn('absolute top-0 left-0 size-full bg-black duration-500', styles['scale-pattern'])}
        style={{
          // @ts-expect-error Doesn't know css
          cornerShape: 'inherit',
          borderRadius: 'inherit',
          opacity,
        }}
      ></span>
      <span
        className={cn(
          'inline-flex flex-col justify-center',
          'col-start-1 row-start-1 text-sm font-semibold relative z-1 opacity-0 duration-500',
          classNameSize,
          {
            'opacity-100': shouldShowAllNumbers || total > 1,
            [styles['value']]: total > 1,
          },
        )}
      >
        {total}
      </span>
      <IconCheck
        className={cn(
          'col-start-1 row-start-1 relative z-1 opacity-0 scale-0 duration-500',
          classNameSize,
          {
            'opacity-100 scale-100': !shouldShowAllNumbers && total === 1,
          },
          styles['value'],
        )}
      />
      <IconHome
        className={cn(
          'col-start-1 row-start-1 relative z-1 opacity-0 scale-0 duration-500',
          classNameSize,
          {
            'opacity-100 scale-65': !shouldShowAllNumbers && total === 0,
          },
          'text-[#54544b]',
        )}
      />
    </span>
  );
};

export default Icon;
