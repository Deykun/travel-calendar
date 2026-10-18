import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconBolt from '@/components/icons/IconBolt';
import IconX from '@/components/icons/IconX';
import { refreshStore } from '@/features/error-boundary/actions/refresh';
import { Pane } from '@/features/sidebar/components/pane/Pane';

type Props = {
  onOpenIntegrations: () => void;
};

export function PaneIntegrationManagement({ onOpenIntegrations }: Props) {
  const { t } = useTranslation();

  return (
    <Pane>
      <Pane.Title>{t('integration.management.title')}</Pane.Title>
      <div className="flex flex-wrap justify-end gap-2">
        <Button onClick={refreshStore} variant="secondary">
          <IconX />
          <span>{t('integration.removeData')}</span>
        </Button>
        <Button onClick={onOpenIntegrations} variant="primary">
          <IconBolt />
          <span>{t('integration.changeDataSource')}</span>
        </Button>
      </div>
    </Pane>
  );
}
