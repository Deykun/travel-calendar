import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconBolt from '@/components/icons/IconBolt';
import IconMap from '@/components/icons/IconMap';
import IconWarning from '@/components/icons/IconWarning';
import Input from '@/components/input/Input';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import type { SettingsScrollTarget } from '@/features/sidebar/stores/useSidebarStore';
import { cn } from '@/utils/tailwind';

import { IntegrationLastUpdate } from '../components/IntegrationLastUpdate';
import { useNomadsIntegration } from '../hooks/useNomadsIntegration';
import useDataStore from '../stores/useDateStore';

type Props = {
  id?: SettingsScrollTarget;
};

export function PaneIntegrationNomads({ id }: Props) {
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
    <Pane id={id}>
      <Pane.Title className="flex gap-2 items-center">
        <IconMap className="text-[#d8da51] size-6" />
        <span>{t('integration.fromNomads')}</span>
      </Pane.Title>
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
