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
  countryCode,
  onClick,
  isActive = false,
  children,
  shouldShowHomeMarker,
  ...props
}: PropsWithChildren<Props>) => {
  const Tag = onClick ? 'button' : 'span';

  const { t } = useTranslation();

  // from,
  // to,
  // numberOfDays,

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
        {'from' in props && props.from === props.to && props.from}
        {'from' in props && props.from !== props.to && (
          <div className="text-[8px] -mt-0.5">
            {props.from} <br /> {props.to}
          </div>
        )}
        {'numberOfDays' in props && (
          <div className="text-[8px]">
            {t('summary.days', { postProcess: 'interval', count: props.numberOfDays })}
          </div>
        )}
        {children}
      </div>
    </Tag>
  );
};
