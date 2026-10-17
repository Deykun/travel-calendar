import { useTranslation } from 'react-i18next';

import IconMap from '@/components/icons/IconMap';
import { TextDateRange } from '@/components/text-date/TextDateRange';
import { PlaceName } from '@/features/calendar/components/calendar/PlaceName';
import useDataStore from '@/features/settings/stores/useDateStore';
import { openSidebar } from '@/features/sidebar/stores/useSidebarStore';
import { cn } from '@/utils/tailwind';

type Props = {
  tripKey: string;
  showOnlyForCountryCode?: string;
};

const getGoogleMapsUrl = ({ latitude, longitude }: { latitude: number; longitude: number }) =>
  `https://www.google.com/maps/@${latitude.toFixed(4)},${longitude.toFixed(4)},12z`;

export const DayTripDetails = ({ tripKey, showOnlyForCountryCode }: Props) => {
  const trip = useDataStore((store) => store.tripsByKey[tripKey]);
  const place = useDataStore((store) => (trip ? store.placesByKey[trip.placeKey] : undefined));
  const { t } = useTranslation();

  const mapsUrl =
    place?.latitude !== undefined && place?.longitude !== undefined
      ? getGoogleMapsUrl({ latitude: place.latitude, longitude: place.longitude })
      : undefined;

  if (showOnlyForCountryCode && trip?.countryCode !== showOnlyForCountryCode) {
    return null;
  }

  if (!trip) {
    return null;
  }

  return (
    <div className={cn('flex flex-col gap-0.5', 'relative', 'text-[#979797]')}>
      <div className={cn('flex gap-4 items-center')}>
        <strong className="text-white tracking-wider font-semibold mr-auto">
          <PlaceName placeKey={trip?.placeKey} />
        </strong>
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            title={t('place.openInMaps')}
            aria-label={t('place.openInMaps')}
            className="hover:text-white duration-300"
          >
            <IconMap className="size-4" />
          </a>
        )}
        <span className={cn('text-white text-[10px] text-nowrap tracking-widest font-medium')}>
          {t('summary.days', { postProcess: 'interval', count: trip.days })}
        </span>
      </div>
      <div className={cn('-mt-2')}>
        <button
          type="button"
          onClick={() => openSidebar({ type: 'country', countryCode: trip.countryCode })}
          className="hover:text-white text-[10px] duration-300"
        >
          {t(`country.name.${trip.countryCode}`)}
        </button>
      </div>
      <div className={cn('flex items-center gap-5')}>
        <TextDateRange
          className={cn('text-[#979797] text-[12px] text-right', 'text-nowrap tracking-wider font-semibold', 'ml-auto')}
          from={trip.from}
          to={trip.to}
        />
      </div>
    </div>
  );
};
