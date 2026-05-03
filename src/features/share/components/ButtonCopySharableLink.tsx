import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconCopy from '@/components/icons/IconCopy';
import useDataStore from '@/features/settings/stores/useDateStore';
import { copyText } from '@/utils/copy';

import { getCurrentSetupLink } from '../actions/getCurrentSetupLink';

export const ButtonCopySharableLink = () => {
  const username = useDataStore((store) => store.integration.integrationCode);
  const { t } = useTranslation();

  if (!username) {
    return null;
  }

  return (
    <Button onClick={() => copyText(getCurrentSetupLink())}>
      <IconCopy />
      <span>{t('integration.copySharableLink')}</span>
    </Button>
  );
};
