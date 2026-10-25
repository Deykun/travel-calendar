import type { CSSProperties, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/tailwind';

import { Image } from '../image/Image';
import { fallbackFlags } from './constants';

type Props = {
  className?: string;
  countryCode: string;
  style?: CSSProperties;
  aspect?: '3x2' | '1x1';
};

export const ImageFlagSimple = ({ className = '', style, aspect = '3x2', countryCode }: PropsWithChildren<Props>) => {
  const { t } = useTranslation();
  const safeCountryCodeForImage = fallbackFlags[countryCode.toUpperCase()] || countryCode.toUpperCase();

  return (
    <Image
      className={cn(
        {
          'aspect-3/2': aspect === '3x2',
          'aspect-square': aspect === '1x1',
        },
        'object-cover',
        'max-w-none',
        'shrink-0',
        'rounded-sm',
        'saturate-75',
        'drop-shadow',
        'bg-transparent text-[#c6c7a7]',
        'leading-none',
        'tracking-widest',
        'text-xs',
        className,
      )}
      style={style}
      alt={countryCode}
      loading="lazy"
      // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
      src={`https://purecatamphetamine.github.io/country-flag-icons/${aspect}/${safeCountryCodeForImage}.svg`}
      onError={() => console.error(`Missing flag for "${safeCountryCodeForImage}".`)}
      title={t(`country.name.${countryCode}`)}
    />
  );
};
