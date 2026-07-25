import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { ImageFlag } from '@/components/image-flag/ImageFlag';
import { cn } from '@/utils/tailwind';

type SharedProps = {
  className?: string;
  countryCode: string;
  onClick?: () => void;
  isActive?: boolean;
  shouldShowHomeMarker?: boolean;
};

type PropsFromTo = {
  from: number;
  to: number;
} & SharedProps;

type PropsFromDays = {
  numberOfDays?: number;
} & SharedProps;

type Props = PropsWithChildren<PropsFromTo> | PropsWithChildren<PropsFromDays>;

export const Period = ({
  className = '',
  from,
  to,
  numberOfDays,
  countryCode,
  onClick,
  isActive = false,
  children,
  shouldShowHomeMarker,
}: PropsWithChildren<Props>) => {
  const Tag = onClick ? 'button' : 'span';

  const { t } = useTranslation();

  return (
    <Tag
      className={cn(
        'inline-flex items-center flex-col gap-1',
        'p-1 pt-2',
        'rounded-sm',
        'duration-150',
        'group',
        {
          'text-[#979797] hover:bg-[#fffb000d] hover:text-white': !isActive,
          'text-white bg-[#fff3] shadow-[0_0_15px_#021019]': isActive,
        },
        className,
      )}
      onClick={onClick}
    >
      <ImageFlag countryCode={countryCode} shouldShowHomeMarker={shouldShowHomeMarker} />
      <div className="mt-1 text-[12px] text-nowrap text-white tracking-widest font-semibold">
        {from === to && from}
        {from !== to && (
          <div className="text-[8px] -mt-0.5">
            {from} <br /> {to}
          </div>
        )}
        {numberOfDays && t('summary.days', { postProcess: 'interval', count: numberOfDays })}
        {children}
      </div>
    </Tag>
  );
};
