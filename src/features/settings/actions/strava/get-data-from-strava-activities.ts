import pLimit from 'p-limit';

import type { IntegrationStravaActivity } from './types';
import { STRAVA_ALLOWED_FORMATS } from './utils/constants';
import { readFile } from './utils/parse-file';

export const getDataFromStravaActivities = async (files: File[]): Promise<IntegrationStravaActivity[]> => {
  const filesToParse = files;
  console.log(files);

  const activities: IntegrationStravaActivity[] = [];

  const limit = pLimit(30);

  const promises = filesToParse.map((file) => {
    return limit(
      () =>
        new Promise((resolve) => {
          const processFile = async (file: File) => {
            const isFormatAllowed = STRAVA_ALLOWED_FORMATS.includes(
              file?.name?.split('.')?.at(-1)?.toLowerCase() || '',
            );
            if (isFormatAllowed) {
              console.log('File allowed');
              readFile(file);
              resolve();
            } else {
              resolve();
            }
          };
          processFile(file);
        }),
    );
  });

  await Promise.all(promises);

  return activities;
};
