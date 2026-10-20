import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconBolt from '@/components/icons/IconBolt';
import IconWarning from '@/components/icons/IconWarning';
import { useNomadsIntegration } from '@/features/settings/hooks/useNomadsIntegration';
import { cn } from '@/utils/tailwind';

const DEMO_USERNAME = 'deykun';

export function AppIntroDemoUser() {
  const { isLoading, errorMessage, fetchNomads } = useNomadsIntegration();
  const { t } = useTranslation();

  const handleDownloadDemoUser = () => {
    fetchNomads(DEMO_USERNAME);
  };

  return (
    <div className={cn('flex flex-col items-center gap-3')}>
      <Button type="button" onClick={handleDownloadDemoUser} isLoading={isLoading}>
        <IconBolt />
        <span>{t('integration.getData')}</span>
      </Button>
      {errorMessage && (
        <p className={cn('flex items-center gap-2', 'text-xs text-left')}>
          <IconWarning className="size-5 shrink-0 text-[#d8da51]" />
          <span>{t(errorMessage)}</span>
        </p>
      )}
    </div>
  );
}
