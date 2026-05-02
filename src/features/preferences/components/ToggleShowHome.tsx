import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';

import usePreferencesStore, { toggleShouldShowHomeInSidebar } from '../stores/usePreferencesStore';

type Props = {
  className?: string;
};

export const ToggleShowHome = ({ className = '' }: Props) => {
  const shouldShowHome = usePreferencesStore((store) => store.sidebars.shouldShowHome);

  const { t } = useTranslation();

  return (
    <Checkbox classNameWrapper={className} isActive={shouldShowHome} onChange={toggleShouldShowHomeInSidebar}>
      {t(`preferences.showHomeCountry`)}
    </Checkbox>
  );
};
