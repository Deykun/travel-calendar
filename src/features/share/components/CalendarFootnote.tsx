import { useTranslation } from 'react-i18next';

import useDataStore, { type IntegrationType } from '@/features/settings/stores/useDateStore';
import { cn } from '@/utils/tailwind';

const DEFAULT_URL = 'https://deykun.github.io/travel-calendar/';

const sourceLabelKeyByType: Record<IntegrationType, string> = {
  'nomads.com': 'integration.fromNomads',
  activities: 'share.footnoteSourceActivities',
};

const dataPointsLabelKeyByType: Record<IntegrationType, string> = {
  'nomads.com': 'integration.trips',
  activities: 'integration.activities',
};

const highlight = (text: string) => `<span class="text-white">${text}</span>`;

type Props = {
  url?: string;
  className?: string;
};

export function CalendarFootnote({ url = DEFAULT_URL, className = '' }: Props) {
  const integration = useDataStore((store) => store.integration);
  const { t } = useTranslation();

  if (!integration.type) {
    return null;
  }

  const source = t(sourceLabelKeyByType[integration.type]);
  const dataPoints =
    integration.totalDataPoints === undefined
      ? undefined
      : t(dataPointsLabelKeyByType[integration.type], { count: integration.totalDataPoints });
  const urlLabel = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <p
      className={cn('text-[#b3b3a8] text-sm', className)}
      dangerouslySetInnerHTML={{
        __html: t(dataPoints ? 'share.footnote' : 'share.footnoteNoDataPoints', {
          source: highlight(source),
          dataPoints: dataPoints ? highlight(dataPoints) : '',
          url: `<a href="${url}" target="_blank" rel="noreferrer" class="text-[#d8da51]">${urlLabel}</a>`,
        }),
      }}
    />
  );
}
