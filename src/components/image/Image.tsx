import { type ComponentProps, type SyntheticEvent, useState } from 'react';

import { cn } from '@/utils/tailwind';

type Props = ComponentProps<'img'>;

const loadedImages: {
  [url: string]: true;
} = {};

export const Image = ({ className, alt = '', src = '', onLoad, onError, ...props }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    loadedImages[src] = true;
    onLoad?.(e);
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(e);
  };

  const isSettled = isLoaded || hasError;

  const wasLoadedEarlier = loadedImages[src] || false;

  return (
    <img
      {...props}
      src={src}
      className={cn(
        'transition-opacity opacity-100 duration-250',
        {
          'opacity-0': !wasLoadedEarlier && !isSettled,
        },
        className,
      )}
      alt={alt}
      data-loaded={isLoaded || undefined}
      data-error={hasError || undefined}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};
