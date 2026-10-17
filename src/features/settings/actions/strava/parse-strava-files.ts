import pLimit from 'p-limit';

import { stravaAddFile, stravaStartLoading } from './stores/useStravaIntegrationStore';
import type { IntegrationStravaActivity } from './types';
import type { ParseFileMode } from './utils/build-activity';
import { STRAVA_ALLOWED_FORMATS } from './utils/constants';
import { getFileFormat } from './utils/read-file-content';
import { readStravaFile } from './utils/read-strava-file';

export const parseStravaFiles = async (files: File[], mode: ParseFileMode): Promise<IntegrationStravaActivity[]> => {
  const filesToParse = files.filter((file) => STRAVA_ALLOWED_FORMATS.includes(getFileFormat(file?.name ?? '')));

  if (filesToParse.length === 0) {
    return [];
  }

  stravaStartLoading({ total: filesToParse.length });

  const activities: IntegrationStravaActivity[] = [];

  const limit = pLimit(mode === 'preflight' ? 200 : 10);

  const promises = filesToParse.map((file) => {
    return limit(
      () =>
        new Promise<boolean>((resolve) => {
          const processFile = async (file: File) => {
            let activity: IntegrationStravaActivity | undefined;

            try {
              activity = await readStravaFile(file, mode);
            } catch (error) {
              console.warn(`File read error: ${file.name}`, error);
            }

            if (activity) {
              activities.push(activity);
            }
            stravaAddFile(activity ? 'processed' : 'rejected');
            resolve(!!activity);
          };
          processFile(file);
        }),
    );
  });

  await Promise.all(promises);

  return activities;
};
