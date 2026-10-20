import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconCopy from '@/components/icons/IconCopy';
import useDataStore from '@/features/settings/stores/useDateStore';
import { openSidebarShare } from '@/features/sidebar/stores/useSidebarStore';
import { copyText } from '@/utils/copy';

import { getCurrentSetupLink } from '../actions/getCurrentSetupLink';

export const ButtonCopySharableLink = () => {
  const username = useDataStore((store) => store.integration.integrationCode);
  const { t } = useTranslation();

  const handleCopy = useCallback(() => {
    openSidebarShare();
    copyText(getCurrentSetupLink());
  }, []);

  if (!username) {
    return null;
  }

  return (
    <Button onClick={handleCopy}>
      <IconCopy />
      <span>{t('integration.copySharableLink')}</span>
    </Button>
  );
};
