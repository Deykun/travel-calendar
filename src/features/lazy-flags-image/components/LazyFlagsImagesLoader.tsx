import { cn } from '@/utils/tailwind';

import { useLazyFlagsImageStore } from '../stores/useLazyFlagsImageStore';
import { LazyFlagsImagesLoaderRequestParser } from './LazyFlagsImagesLoaderRequestParser';

export const LazyFlagsImagesLoader = () => {
  const request = useLazyFlagsImageStore((store) => store.queue.at(0));

  console.log('request', request);

  if (request) {
    return <LazyFlagsImagesLoaderRequestParser request={request} />;
  }
  return null;
};
