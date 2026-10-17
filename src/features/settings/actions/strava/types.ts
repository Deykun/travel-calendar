import type { DateYYYYMMDD } from '@/types';

export type IntegrationStravaActivity = {
  id: string;
  date_start: DateYYYYMMDD;
  date_end: DateYYYYMMDD;
  place: string;
  country_codes: string[];
  latitude?: number | undefined;
  longitude?: number | undefined;
};
