import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/tailwind';

type Props = {
  className?: string;
};

export const Icon = ({ className = '', children }: PropsWithChildren<Props>) => {
  return (
    <span
      className={cn(
        'relative',
        'inline-grid place-items-center',
        'rounded-lg',
        'leading-0',
        'duration-500',
        'p-0.75',
        'bg-[#272620] text-[#54544b]',
        className,
      )}
      style={{
        // @ts-expect-error Doesn't know css
        cornerShape: 'superellipse(1.5)',
      }}
    >
      {children}
    </span>
  );
};

export default Icon;
