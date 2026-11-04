import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import useFiltersStore, { toggleHomeCountry } from '@/features/filters/stores/useFilterStore';

type Props = {
  className?: string;
  countryCode: string;
};

export const ToggleHomeCountry = ({ className = '', countryCode }: Props) => {
  const isActive = useFiltersStore((store) => store.activeFilters.homeCountriesCodes.includes(countryCode));

  const { t } = useTranslation();
  return (
    <Checkbox
      classNameWrapper={className}
      key={countryCode}
      isActive={isActive}
      onChange={() => toggleHomeCountry(countryCode)}
    >
      <span className="whitespace-nowrap text-ellipsis overflow-hidden"> {t(`preferences.homeCountry`)}</span>
    </Checkbox>
  );
};
