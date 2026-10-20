import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconBolt from '@/components/icons/IconBolt';
import IconWarning from '@/components/icons/IconWarning';
import Input from '@/components/input/Input';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import { IntegrationLastUpdate } from '../components/IntegrationLastUpdate';
import { useNomadsIntegration } from '../hooks/useNomadsIntegration';
import useDataStore from '../stores/useDateStore';

export function PaneIntegrationNomads() {
  const { isLoading, errorMessage, clearError, fetchNomads } = useNomadsIntegration();
  const integration = useDataStore((store) => store.integration);
  const integrationCode = useDataStore((store) => store.integration.integrationCode);
  const [username, setUsername] = useState(integrationCode ?? '');

  const { t } = useTranslation();

  const handleUsernameUpdate = (newValue: string) => {
    setUsername(newValue);
    clearError();
  };

  const handleSubmitNomads: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!username) {
      return;
    }

    fetchNomads(username);
  };

  return (
    <Pane>
      <Pane.Title>{t('integration.fromNomads')}</Pane.Title>
      <form onSubmit={handleSubmitNomads} className={cn('flex flex-col gap-3')}>
        <Pane.Subtitle>{t('integration.withNomads')}</Pane.Subtitle>
        <Input value={username} setValue={handleUsernameUpdate} isDisabled={isLoading} placeholder="Username" />
        <Button className="ml-auto" type="submit" isDisabled={!username} isLoading={isLoading}>
          <IconBolt />
          <span>{t('integration.getData')}</span>
        </Button>
      </form>
      {integration.type === 'nomads.com' && <IntegrationLastUpdate date={integration.lastUpdate} className="mt-2" />}
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
