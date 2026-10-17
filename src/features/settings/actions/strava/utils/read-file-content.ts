const isGzFile = (file: File) => file.name.toLowerCase().endsWith('.gz');

// 'ride.fit.gz' -> 'fit', 'walk.GPX' -> 'gpx'
export const getFileFormat = (fileName: string) => fileName.toLowerCase().replace(/\.gz$/, '').split('.').at(-1) ?? '';

// Decompresses *.gz (Strava exports .fit.gz / .gpx.gz) via browser-native DecompressionStream
export const extractGzFile = (file: File): Promise<ArrayBuffer> => {
  const stream = file.stream().pipeThrough(new DecompressionStream('gzip'));

  return new Response(stream).arrayBuffer();
};

export const readFileBuffer = (file: File): Promise<ArrayBuffer> =>
  isGzFile(file) ? extractGzFile(file) : file.arrayBuffer();

export const readFileText = async (file: File): Promise<string> => new TextDecoder().decode(await readFileBuffer(file));
