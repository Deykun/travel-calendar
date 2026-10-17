import type { IntegrationStravaActivity } from '../types';
import type { ParseFileMode } from './build-activity';
import { getFileFormat, readFileBuffer, readFileText } from './read-file-content';
import { isFitContent, parseFitContent } from './read-file-fit';
import { isGpxContent, parseGpxContent } from './read-file-gpx';

// Picks parser by extension (gz stripped), sniffs content before parsing. Throws on read / decompress errors.
export const readStravaFile = async (
  file: File,
  mode: ParseFileMode,
): Promise<IntegrationStravaActivity | undefined> => {
  const format = getFileFormat(file.name);

  if (format === 'gpx') {
    const content = await readFileText(file);

    if (!isGpxContent(content)) {
      console.warn(`Not a GPX file: ${file.name}`);

      return;
    }

    return parseGpxContent(file.name, content, mode);
  }

  if (format === 'fit') {
    const buffer = await readFileBuffer(file);

    if (!isFitContent(buffer)) {
      console.warn(`Not a FIT file: ${file.name}`);

      return;
    }

    return parseFitContent(file.name, buffer, mode);
  }

  console.warn(`Unsupported format "${format}": ${file.name}`);

  return;
};
