import { useTranslation } from 'react-i18next';

import useDataStore from '@/features/settings/stores/useDateStore';

type Props = {
  placeKey: string;
};

export const PlaceName = ({ placeKey }: Props) => {
  const { t } = useTranslation();
  const place = useDataStore((store) => store.placesByKey[placeKey]);

  if (place?.name) {
    return place.name;
  }

  return t('place.missingName');
};
