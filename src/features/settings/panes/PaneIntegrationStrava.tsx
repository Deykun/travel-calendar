import { useTranslation } from 'react-i18next';

import { Datetime } from '@/components/datetime/datetime';
import { Progressbar } from '@/components/progressbar/Progressbar';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import { getDataFromStrava } from '../actions/get-data-from-strava';
import useStravaIntegrationsStore from '../actions/strava/stores/useStravaIntegrationStore';
import { WindowDropzone } from '../components/WindowDropzone';
import useDataStore from '../stores/useDateStore';

const STRAVA_EXPORT_URL = 'https://www.strava.com/athlete/delete_your_account';

const handleFiles = (files: File[]) => getDataFromStrava({ files });

export function PaneIntegrationStrava() {
  const integration = useDataStore((store) => store.integration);
  const integrationStatus = useStravaIntegrationsStore((store) => store.status);

  const isLoading = integrationStatus.state === 'loading';

  const { t } = useTranslation();

  return (
    <Pane>
      <Pane.Title>{t('integration.fromStrava')}</Pane.Title>
      <Pane.Subtitle>{t('integration.withStrava')}</Pane.Subtitle>
      <p className="text-[#979797] text-xs">{t('integration.strava.intro')}</p>
      <ol className="list-decimal pl-4 flex flex-col gap-1 text-[#979797] text-xs [&_a]:text-white [&_a]:underline">
        <li
          dangerouslySetInnerHTML={{
            __html: t('integration.strava.step1', {
              link: `<a href="${STRAVA_EXPORT_URL}" target="_blank" rel="noreferrer">${t('integration.strava.step1Link')}</a>`,
            }),
          }}
        />
        <li>{t('integration.strava.step2')}</li>
        <li>{t('integration.strava.step3')}</li>
        <li>{t('integration.strava.step4')}</li>
      </ol>
      <p
        className="text-[#979797] text-xs [&_strong]:text-white [&_strong]:font-normal"
        dangerouslySetInnerHTML={{ __html: `🔒 ${t('integration.strava.privacy')}` }}
      />
      <label
        className={cn(
          'relative',
          'flex items-center justify-center',
          'w-full min-h-20 p-3',
          'text-xs text-center text-[#979797]',
          'bg-[#282824] rounded-sm',
          'border-2 border-dashed border-[#979797]/40',
          'hover:border-[#d8da51] hover:text-white',
          'focus-within:border-[#fcff4e] focus-within:text-white',
          'has-disabled:opacity-45 has-disabled:pointer-events-none',
          'duration-500',
        )}
      >
        {t('integration.strava.dropzone')}
        <input
          // Invisible but covering the whole label: keeps native click + drag-and-drop
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(event) => (event.target.files ? handleFiles(Array.from(event.target.files)) : undefined)}
          disabled={isLoading}
          accept=".gpx,.fit,.gz"
          type="file"
          multiple
        />
      </label>
      <WindowDropzone onDrop={handleFiles} isDisabled={isLoading} />
      {integrationStatus.total > 0 && (
        <Progressbar
          key={integrationStatus.startedAt}
          value={integrationStatus.processed + integrationStatus.rejected}
          total={integrationStatus.total}
          startedAt={integrationStatus.startedAt}
        />
      )}
      {integration.type === 'activities' && integration.lastUpdate && (
        <p className="text-[#979797] text-xs mt-2">
          {t('integration.lastUpdatePrefix')}{' '}
          <span className="text-white">
            <Datetime date={integration.lastUpdate} />
          </span>
          .
        </p>
      )}
    </Pane>
  );
}
