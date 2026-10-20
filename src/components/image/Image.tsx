import { type ComponentProps, type SyntheticEvent, useState } from 'react';

import { cn } from '@/utils/tailwind';

type Props = ComponentProps<'img'>;

export const Image = ({ className, alt = '', onLoad, onError, ...props }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(e);
  };

  const isSettled = isLoaded || hasError;

  return (
    <img
      {...props}
      className={cn('transition-opacity duration-250', isSettled ? 'opacity-100' : 'opacity-0', className)}
      alt={alt}
      data-loaded={isLoaded || undefined}
      data-error={hasError || undefined}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};
