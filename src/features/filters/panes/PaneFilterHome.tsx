import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import IconBulb from '@/components/icons/IconBulb';
import IconTravel from '@/components/icons/IconTravel';
import { MiniCalendarForCountry } from '@/features/calendar/components/mini-calendar/MiniCalendarForCountry';
import useFiltersStore, { setHomeCountriesCodes, toggleHomeCountry } from '@/features/filters/stores/useFilterStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';

type Props = {
  className?: string;
};

export const PaneFilterHome = ({ className = '' }: Props) => {
  const [wasAllToggled, setWasAllToggled] = useState(true);
  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes);
  const totalDaysByCountry = useDataStore((store) => store.totalDaysByCountry);

  const countriesToList = useMemo(() => {
    return Object.entries(totalDaysByCountry);
  }, [totalDaysByCountry]);

  const { t } = useTranslation();
  return (
    <Pane className={className}>
      <Pane.Title>{t('preferences.homeCountry')}</Pane.Title>
      <p className="mb-2 w-full">
        {t('preferences.homeCountry.tip')} <IconTravel total={0} />
      </p>
      <Pane.List>
        {countriesToList.map(([countryCode, total]) =>
          total < 0 ? null : (
            <Checkbox
              className="whitespace-nowrap text-ellipsis overflow-hidden"
              classNameChildren="whitespace-nowrap text-ellipsis overflow-hidden"
              key={countryCode}
              isActive={homeCountriesCodes.includes(countryCode)}
              onChange={() => toggleHomeCountry(countryCode)}
            >
              <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                {t(`country.name.${countryCode}`)}
              </span>
              <strong className="shrink-0 font-semibold text-white text-xs">
                {t('summary.days', { postProcess: 'interval', count: total })}
              </strong>
              <MiniCalendarForCountry countryCode={countryCode} />
            </Checkbox>
          ),
        )}
        {countriesToList.length > 10 && (
          <Pane.Footer isSticky={homeCountriesCodes.length === countriesToList.length || wasAllToggled}>
            <h4 className="flex gap-2 mb-1 text-sm text-[white] font-semibold tracking-wide">
              <IconBulb className="size-5 text-[#d8da51]" /> <span>{t('common.idea')}</span>
            </h4>
            <p className="text-xs mb-2">{t('preferences.homeCountry.selectManyTip')}</p>
            <div className="flex gap-10">
              <Checkbox
                isActive={homeCountriesCodes.length === countriesToList.length}
                onChange={() => {
                  setWasAllToggled(true);

                  if (homeCountriesCodes.length === countriesToList.length) {
                    setHomeCountriesCodes([]);

                    return;
                  }

                  setHomeCountriesCodes(Object.keys(totalDaysByCountry));
                }}
              >
                {t('common.all')}
              </Checkbox>
            </div>
          </Pane.Footer>
        )}
      </Pane.List>
    </Pane>
  );
};
