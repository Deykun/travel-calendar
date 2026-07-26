import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useEffectChange(callback: () => void, args: any[]) {
  const wasInitialized = useRef(false);

  useEffect(() => {
    if (!wasInitialized.current) {
      wasInitialized.current = true;

      return;
    }

    return callback();
  }, args); // eslint-disable-line react-hooks/exhaustive-deps
}
