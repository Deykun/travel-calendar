import FitParser from 'fit-file-parser';

import type { IntegrationStravaActivity } from '../types';
import { type ParseFileMode, buildActivity } from './build-activity';

// FIT header carries the ".FIT" signature at bytes 8-11
export const isFitContent = (buffer: ArrayBuffer) => new TextDecoder().decode(buffer.slice(8, 12)) === '.FIT';

export const parseFitContent = async (
  id: string,
  buffer: ArrayBuffer,
  mode: ParseFileMode,
): Promise<IntegrationStravaActivity | undefined> => {
  // force - skip CRC validation (Strava exports occasionally fail it), list - flat records array
  const parser = new FitParser({ force: true, mode: 'list' });
  const { records = [] } = await parser.parseAsync(buffer);

  return buildActivity(
    id,
    records,
    // position_* already converted from semicircles to degrees by the parser
    (record) => ({ latitude: record.position_lat, longitude: record.position_long, time: record.timestamp }),
    mode,
  );
};
