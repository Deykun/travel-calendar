// https://github.com/Deykun/react-scieski/blob/master/src/utils/tracks.js
import type { IntegrationStravaActivity } from '../types';
import { type ParseFileMode, buildActivity } from './build-activity';

export const createPoint = ({
  latitude,
  longitude,
  time,
  altitude = 0,
}: {
  latitude: number;
  longitude: number;
  time: string;
  altitude: number;
}) => {
  return { latitude: Number(latitude), longitude: Number(longitude), time: time, altitude: Number(altitude) };
};

// Cheap check before handing content to DOMParser - GPX tracks always contain <trkpt> points
export const isGpxContent = (content: string) => content.includes('<trkpt');

const toCoordinate = (value: string | null) => (value ? Number(value) : undefined);

export const parseGpxContent = (
  id: string,
  fileContent: string,
  mode: ParseFileMode,
): IntegrationStravaActivity | undefined => {
  const xmlParser = new DOMParser();
  const xmlFileContent = xmlParser.parseFromString(fileContent, 'text/xml');

  const rawPointsGPX = [...xmlFileContent.querySelectorAll('trkpt')];

  return buildActivity(
    id,
    rawPointsGPX,
    (rawPoint) => ({
      latitude: toCoordinate(rawPoint.getAttribute('lat')),
      longitude: toCoordinate(rawPoint.getAttribute('lon')),
      time: rawPoint.querySelector('time')?.textContent,
    }),
    mode,
  );
};
