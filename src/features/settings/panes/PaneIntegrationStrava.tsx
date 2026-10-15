import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Datetime } from '@/components/datetime/datetime';
import IconWarning from '@/components/icons/IconWarning';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import { getDataFromStrava } from '../actions/get-data-from-strava';
import { parseStravaFiles } from '../actions/strava/parse-strava-files';
import useStravaIntegrationsStore from '../actions/strava/stores/useStravaIntegrationStore';
import useDataStore from '../stores/useDateStore';

const STRAVA_EXPORT_URL = 'https://www.strava.com/athlete/delete_your_account';

export function PaneIntegrationStatsHunters() {
  const [errorMessage, setErrorMessage] = useState('');
  const integrationCode = useDataStore((store) => store.integration.integrationCode);
  const lastUpdate = useDataStore((store) => store.integration.lastUpdate);
  const integrationStatus = useStravaIntegrationsStore((store) => store.status);

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
      <input
        className={cn(
          'w-full',
          'py-1.5 px-3',
          'text-sm',
          'bg-[#282824] rounded-sm',
          'caret-[#d8da51] text-white',
          'outline-none',
        )}
        onChange={(event) =>
          event.target.files ? getDataFromStrava({ files: Array.from(event.target.files) }) : undefined
        }
        // disabled={integrationStatus.state === 'loading'}
        type="file"
        multiple
      />
      {integrationStatus.processed} + {integrationStatus.rejected} / {integrationStatus.total}
      {lastUpdate && (
        <p className="text-[#979797] text-xs mt-2">
          {t('integration.lastUpdatePrefix')}{' '}
          <span className="text-white">
            <Datetime date={lastUpdate} />
          </span>
          .
        </p>
      )}
      {errorMessage && (
        <Pane.Footer>
          <h4 className="flex gap-2 mb-1 text-sm text-[white] font-semibold tracking-wide">
            <IconWarning className="size-5 text-[#d8da51]" /> <span>{t('common.error')}</span>
          </h4>
          <p className="text-xs mb-2">{t(errorMessage)}</p>
        </Pane.Footer>
      )}
    </Pane>
  );
}
