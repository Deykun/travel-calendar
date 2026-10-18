import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/tailwind';

type Props = {
  onDrop: (files: File[]) => void;
  isDisabled?: boolean;
};

const hasFiles = (event: DragEvent) => Boolean(event.dataTransfer?.types.includes('Files'));

// Whole-window drop target, active only while mounted. Overlay is portaled to body.
export const WindowDropzone = ({ onDrop, isDisabled = false }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  // dragenter/dragleave fire for every child element, counter tells when the cursor really left the window
  const depth = useRef(0);

  const { t } = useTranslation();

  useEffect(() => {
    const reset = () => {
      depth.current = 0;
      setIsDragging(false);
    };

    const handleDragEnter = (event: DragEvent) => {
      if (!hasFiles(event)) {
        return;
      }

      event.preventDefault();
      depth.current += 1;

      if (!isDisabled) {
        setIsDragging(true);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      if (!hasFiles(event)) {
        return;
      }

      // Required, otherwise browser won't fire drop
      event.preventDefault();

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = isDisabled ? 'none' : 'copy';
      }
    };

    const handleDragLeave = (event: DragEvent) => {
      if (!hasFiles(event)) {
        return;
      }

      depth.current = Math.max(0, depth.current - 1);

      if (depth.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDrop = (event: DragEvent) => {
      if (!hasFiles(event)) {
        return;
      }

      // Always prevent, otherwise browser navigates to the dropped file
      event.preventDefault();
      reset();

      const files = Array.from(event.dataTransfer?.files ?? []);

      if (!isDisabled && files.length > 0) {
        onDrop(files);
      }
    };

    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
      reset();
    };
  }, [isDisabled, onDrop]);

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-1000',
        // Never a hit-target itself, so drag events keep flowing to the page underneath
        'pointer-events-none',
        'p-6',
        'bg-[#111110]/90',
        'transition-bounce',
        {
          'opacity-0': !isDragging,
        },
      )}
      aria-hidden={!isDragging}
    >
      <div
        className={cn(
          'flex items-center justify-center',
          'w-full h-full',
          'rounded-xl',
          'border-2 border-dashed border-[#d8da51]',
          'text-white text-2xl font-semibold text-center',
        )}
      >
        {t('integration.strava.dropAnywhere')}
      </div>
    </div>,
    document.body,
  );
};
