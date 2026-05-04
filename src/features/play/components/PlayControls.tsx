import { useTranslation } from 'react-i18next';

import IconPlay from '@/components/icons/IconPlay';
import IconStop from '@/components/icons/IconStop';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import usePlayStore, { actionPlay, actionStop } from '../store/usePlayStore';

type Props = {
  fromYear: number | undefined;
  toYear: number | undefined;
};

export const PlayControls = ({ fromYear, toYear }: Props) => {
  const state = usePlayStore((store) => store.state);
  const { t } = useTranslation();

  const hasEnoughData = Boolean(fromYear && toYear);

  return (
    <Pane.Footer className="flex gap-1">
      {hasEnoughData === false && <p className="ml-auto text-xs">Pick filters to activate play.</p>}
      {hasEnoughData && (
        <>
          <button
            className={cn('inline-flex align-middle gap-1', 'text-white text-xs font-semibold')}
            onClick={() => (state === 'playing' ? actionStop() : actionPlay({ to: toYear }))}
          >
            {state === 'stopped' ? (
              <>
                <IconPlay className="size-4" />
                <span>{t('play.play')}</span>
              </>
            ) : (
              <>
                <IconStop className="size-4" />
                <span>{t('play.stop')}</span>
              </>
            )}
          </button>
          {state === 'stopped' && (
            <p className="ml-auto text-xs">
              {fromYear} - {toYear}
            </p>
          )}
        </>
      )}
    </Pane.Footer>
  );
};
