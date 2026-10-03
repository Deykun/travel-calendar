import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/tailwind';

import IconFlagPlus from '../icons/IconFlagPlus';
import IconPinPlus from '../icons/IconPinPlus';
import IconPlus from '../icons/IconPlus';
import IconPlusCircle from '../icons/IconPlusCircle';
import IconTravel from '../icons/IconTravel';
import IconTravelWrapper from '../icons/IconTravelWrapper';

const fallbackFlags: { [key: string]: string | undefined } = {
  UK: 'GB',
  KS: 'XK',
};

type Props = {
  countryCode: string;
  shouldShowHomeMarker?: boolean;
  wasUnlocked?: boolean;
};

export const ImageFlag = ({
  countryCode,
  shouldShowHomeMarker = false,
  wasUnlocked = false,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();
  const safeCountryCode = fallbackFlags[countryCode.toUpperCase()] || countryCode.toUpperCase();

  return (
    <span className={cn('inline-flex relative', 'p-1.5', 'bg-[#3d3d3d6e]', 'rounded-[10px]')}>
      <img
        className={cn(
          'w-9',
          'aspect-3/2',
          'object-cover',
          'max-w-none',
          'shrink-0',
          'rounded-sm',
          'saturate-75',
          'drop-shadow',
          'bg-transparent text-gray-400',
          'leading-none',
          'tracking-widest',
          'text-xs',
        )}
        alt={safeCountryCode}
        loading="lazy"
        // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${safeCountryCode}.svg`}
        onError={() => console.error(`Missing flag for "${safeCountryCode}".`)}
        title={t(`country.name.${safeCountryCode.toLowerCase()}`)}
      />
      {shouldShowHomeMarker && (
        <IconTravel className="absolute -bottom-1 -right-1 z-10" classNameSize="size-5" total={0} />
      )}
      {wasUnlocked && (
        <IconTravelWrapper className={cn('absolute -bottom-1 -right-1 z-10 size-4', 'bg-[#178001] text-white')}>
          <IconPlus />
        </IconTravelWrapper>
      )}
    </span>
  );
};
