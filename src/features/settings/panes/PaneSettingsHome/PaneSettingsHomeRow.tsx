import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { MiniCalendarForCountry } from '@/features/calendar/components/mini-calendar/MiniCalendarForCountry';
import useFiltersStore, { toggleHomeCountry } from '@/features/filters/stores/useFilterStore';

type Props = {
  countryCode: string;
  total: number;
};

export const PaneSettingsHomeRow = ({ countryCode, total }: Props) => {
  const checkboxRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isActive = useFiltersStore((store) => store.activeFilters.homeCountriesCodes.includes(countryCode));

  const { t } = useTranslation();

  useEffect(() => {
    const element = checkboxRef.current;

    if (!element) {
      return;
    }

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Checkbox
      ref={checkboxRef}
      className="whitespace-nowrap text-ellipsis overflow-hidden"
      classNameChildren="whitespace-nowrap text-ellipsis overflow-hidden"
      isActive={isActive}
      onChange={() => toggleHomeCountry(countryCode)}
    >
      <span className="whitespace-nowrap text-ellipsis overflow-hidden">{t(`country.name.${countryCode}`)}</span>
      <strong className="shrink-0 font-semibold text-white text-xs">
        {t('summary.days', { postProcess: 'interval', count: total })}
      </strong>
      {isHovered && <MiniCalendarForCountry countryCode={countryCode} />}
    </Checkbox>
  );
};
