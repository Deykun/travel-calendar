import { useTranslation } from 'react-i18next';

import IconBulb from '@/components/icons/IconBulb';
import { Progressbar } from '@/components/progressbar/Progressbar';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import { getDataFromStrava } from '../actions/get-data-from-strava';
import useStravaIntegrationsStore from '../actions/strava/stores/useStravaIntegrationStore';
import { IntegrationLastUpdate } from '../components/IntegrationLastUpdate';
import { WindowDropzone } from '../components/WindowDropzone';
import useDataStore from '../stores/useDateStore';

const STRAVA_EXPORT_URL = 'https://www.strava.com/athlete/delete_your_account';

const handleFiles = (files: File[]) => getDataFromStrava({ files });

export function PaneIntegrationStrava() {
  const integration = useDataStore((store) => store.integration);
  const integrationStatus = useStravaIntegrationsStore((store) => store.status);

  const isLoading = integrationStatus.state === 'loading';

  const { t } = useTranslation();

  const shouldShowProgress =
    integrationStatus.total > 0 && integrationStatus.total !== integrationStatus.processed + integrationStatus.rejected;

  return (
    <Pane>
      <Pane.Title>{t('integration.fromStrava')}</Pane.Title>
      <Pane.Subtitle>{t('integration.strava.subtitle')}</Pane.Subtitle>
      <ol className="list-decimal pl-4 flex flex-col gap-2 text-[#979797] text-sm [&_a]:text-white [&_a]:hover:text-[#d8da51] [&_a]:duration-500">
        <li>
          <span
            dangerouslySetInnerHTML={{
              __html: t('integration.strava.step1', {
                link: `<a href="${STRAVA_EXPORT_URL}" target="_blank" rel="noreferrer">${t('integration.strava.step1Link')}</a>`,
              }),
            }}
          />
          <small className="block text-xs opacity-50 mt-2">{t('integration.strava.step1Note')}</small>
        </li>
        <li>{t('integration.strava.step2')}</li>
        <li
          dangerouslySetInnerHTML={{
            __html: t('integration.strava.step3', {
              folder: '<span class="text-white">activities</span>',
            }),
          }}
        />
      </ol>
      <label
        className={cn(
          'mt-2',
          'relative',
          'flex items-center justify-center',
          'w-full min-h-25 p-3',
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
      {shouldShowProgress && (
        <Progressbar
          key={integrationStatus.startedAt}
          value={integrationStatus.processed + integrationStatus.rejected}
          total={integrationStatus.total}
          startedAt={integrationStatus.startedAt}
        />
      )}
      {integration.type === 'activities' && <IntegrationLastUpdate date={integration.lastUpdate} className="mt-2" />}
      <Pane.Footer>
        <h4 className="flex gap-2 mb-1 text-sm text-[white] font-semibold tracking-wide">
          <IconBulb className="size-5 text-[#d8da51]" /> <span>{t('integration.strava.privacyTitle')}</span>
        </h4>
        <ul className="list-disc pl-4 flex flex-col gap-1 text-xs">
          <li>{t('integration.strava.privacyBrowser')}</li>
          <li>{t('integration.strava.privacyLocation')}</li>
          <li>{t('integration.strava.privacyAnalytics')}</li>
        </ul>
      </Pane.Footer>
    </Pane>
  );
}
