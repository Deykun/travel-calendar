import { useLazyFlagsImageStore } from '../stores/useLazyFlagsImageStore';
import { LazyFlagsImagesLoaderRequestParser } from './LazyFlagsImagesLoaderRequestParser';

export const LazyFlagsImagesLoader = () => {
  const [request, request2] = useLazyFlagsImageStore((store) => store.queue);

  return (
    <>
      {request && <LazyFlagsImagesLoaderRequestParser key={request.key} request={request} />}
      {request2 && <LazyFlagsImagesLoaderRequestParser key={request2.key} request={request2} />}
    </>
  );
};
