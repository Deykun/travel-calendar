import pLimit from 'p-limit';

import { stravaAddFile, stravaStartLoading } from './stores/useStravaIntegrationStore';
import type { IntegrationStravaActivity } from './types';
import { STRAVA_ALLOWED_FORMATS } from './utils/constants';
import { type ParseFileMode, readFile } from './utils/parse-file';

export const parseStravaFiles = async (files: File[], mode: ParseFileMode): Promise<IntegrationStravaActivity[]> => {
  const filesToParse = files.filter((file) =>
    STRAVA_ALLOWED_FORMATS.includes(file?.name?.split('.')?.at(-1)?.toLowerCase() || ''),
  );
  console.log(files);

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
            const activity = await readFile(file, mode);
            const isSuccess = !!activity;
            if (isSuccess) {
              activities.push(activity);
            }
            stravaAddFile(isSuccess ? 'processed' : 'rejected');
            resolve(isSuccess);
          };
          processFile(file);
        }),
    );
  });

  await Promise.all(promises);

  return activities;
};
