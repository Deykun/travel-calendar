import * as htmlToImage from 'html-to-image';
import { useRef } from 'react';

import { getSliceMaskStyle } from '@/components/flag-stack/utils/getSliceMaskStyle';
import { ImageFlagSimple } from '@/components/image-flag/ImageFlagSimple';
import { cn } from '@/utils/tailwind';

import {
  type LazyImageRequest,
  dropLazyFlagsImageRequest,
  setLazyLoadedImageBlobUrl,
} from '../stores/useLazyFlagsImageStore';

type Props = {
  request: LazyImageRequest;
};

export const LazyFlagsImagesLoaderRequestParser = ({ request: { key, countriesCodes, mode } }: Props) => {
  const total = countriesCodes.length;
  // Ref, not state: loading progress shouldn't re-render; parent remounts by request key so it resets per request.
  const loadedCountriesCodes = useRef<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  const captureGridAsBlobUrl = async () => {
    const node = gridRef.current;

    if (!node) {
      throw new Error('Grid not mounted');
    }

    // skipFonts: nothing textual to capture, and font embedding parses every stylesheet (cross-origin ones throw).
    const blob = await htmlToImage.toBlob(node, { skipFonts: true });

    if (!blob) {
      throw new Error('Empty blob');
    }

    return URL.createObjectURL(blob);
  };

  // A flag that never loads would never complete the request, stalling the queue head. Drop it instead.
  const handleFlagError = (countryCode: string) => {
    console.error(`Lazy flags image failed for "${key}": flag "${countryCode}" didn't load.`);
    dropLazyFlagsImageRequest(key);
  };

  const handleFlagLoad = (countryCode: string) => {
    loadedCountriesCodes.current.add(countryCode);

    if (loadedCountriesCodes.current.size !== total) {
      return;
    }

    captureGridAsBlobUrl()
      .then((blobUrl) => setLazyLoadedImageBlobUrl(key, blobUrl))
      .catch((error: unknown) => {
        console.error(`Lazy flags image failed for "${key}".`, error);
        dropLazyFlagsImageRequest(key);
      });
  };

  return (
    <div className={cn('fixed bottom-0 left-0 z-10 opacity-0 pointer-events-none')}>
      <div ref={gridRef} className="grid">
        {countriesCodes.toReversed().map((countryCode, index) => {
          return (
            <div
              key={countryCode}
              className={cn('col-start-1 row-start-1', 'w-12')}
              style={getSliceMaskStyle(index, total, mode)}
            >
              <ImageFlagSimple
                // Image fades in via opacity-0 → opacity-100 over 250ms; capture runs inside onLoad, before that
                // re-render, so the clone would copy opacity 0. Force opaque + no transition for the capture.
                className="rounded-none opacity-100 transition-none"
                countryCode={countryCode}
                onLoad={() => handleFlagLoad(countryCode)}
                onError={() => handleFlagError(countryCode)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
