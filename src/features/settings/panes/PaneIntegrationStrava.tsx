import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import { Datetime } from '@/components/datetime/datetime';
import IconBolt from '@/components/icons/IconBolt';
import IconWarning from '@/components/icons/IconWarning';
import Input from '@/components/input/Input';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { openSidebarFilters } from '@/features/sidebar/stores/useSidebarStore';
import { cn } from '@/utils/tailwind';

import { getDataFromNomads } from '../actions/get-data-from-nomads';
import { getDataFromStravaActivities } from '../actions/strava/get-data-from-strava-activities';
import useDataStore from '../stores/useDateStore';

const STRAVA_EXPORT_URL = 'https://www.strava.com/athlete/delete_your_account';

export function PaneIntegrationStatsHunters() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const integrationCode = useDataStore((store) => store.integration.integrationCode);
  const lastUpdate = useDataStore((store) => store.integration.lastUpdate);
  const [username, setUsername] = useState(integrationCode ?? 'deykun');

  const { t } = useTranslation();

  //   const handleUsernameUpdate = (newValue: string) => {
  //     setUsername(newValue);
  //     setErrorMessage('');
  //   };

  const handleSubmitNomads: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    if (username) {
      const response = await getDataFromNomads({ username });

      if (response.isSuccess) {
        openSidebarFilters();

        return;
      }

      setErrorMessage(response.reason);
    }

    setIsLoading(false);
  };

  return (
    <Pane>
      <Pane.Title>{t('integration.fromStrava')}</Pane.Title>
      <form onSubmit={handleSubmitNomads} className={cn('flex flex-col gap-3')}>
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
        <Button className="ml-auto" type="submit" isDisabled={!username} isLoading={isLoading}>
          <IconBolt />
          <span>{t('integration.getData')}</span>
        </Button>
      </form>
      <input
        className={clsx(
          'w-full',
          'py-1.5 px-3',
          'text-sm',
          'bg-[#282824] rounded-sm',
          'caret-[#d8da51] text-white',
          'outline-none',
        )}
        onChange={(event) =>
          event.target.files ? getDataFromStravaActivities(Array.from(event.target.files)) : undefined
        }
        type="file"
        multiple
      />
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
