import { useTranslation } from 'react-i18next';

import { TextDateRange } from '@/components/text-date/TextDateRange';
import { PlaceName } from '@/features/calendar/components/calendar/PlaceName';
import useDataStore from '@/features/settings/stores/useDateStore';
import { openSidebar } from '@/features/sidebar/stores/useSidebarStore';
import { cn } from '@/utils/tailwind';

type Props = {
  tripKey: string;
  showOnlyForCountryCode?: string;
};

export const DayTripDetails = ({ tripKey, showOnlyForCountryCode }: Props) => {
  const trip = useDataStore((store) => store.tripsByKey[tripKey]);
  const { t } = useTranslation();

  if (showOnlyForCountryCode && trip?.countryCode !== showOnlyForCountryCode) {
    return null;
  }

  if (!trip) {
    return null;
  }

  return (
    <div className={cn('flex flex-col gap-1', 'relative', 'text-[#979797]')}>
      <div className={cn('flex gap-1 justify-between')}>
        <strong className="text-white tracking-wider font-semibold">
          <PlaceName placeKey={trip?.placeKey} />
        </strong>
        <span className={cn('text-white text-[10px] text-nowrap tracking-widest font-medium')}>
          {t('summary.days', { postProcess: 'interval', count: trip.days })}
        </span>
      </div>
      <p className="text-[#979797] text-[10px] tracking-wider -mt-1 mb-1">
        <button
          type="button"
          onClick={() => openSidebar({ type: 'country', countryCode: trip.countryCode })}
          className="hover:text-white duration-300"
        >
          {t(`country.name.${trip.countryCode}`)}
        </button>
      </p>
      <TextDateRange
        className={cn('text-[#979797] text-[12px] text-right', 'text-nowrap tracking-wider font-semibold', 'mb-2')}
        from={trip.from}
        to={trip.to}
      />
    </div>
  );
};
