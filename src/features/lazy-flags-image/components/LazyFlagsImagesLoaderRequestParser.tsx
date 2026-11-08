import { type LazyImageRequest } from '../stores/useLazyFlagsImageStore';

type Props = {
  request: LazyImageRequest;
};

export const LazyFlagsImagesLoaderRequestParser = ({ request }: Props) => {
  return <div>{request.key}</div>;
};
