export type DateLike = Date | number | string;

export type MetadataPlace = {
  key: string;
  name: string;
  country: string;
  latitude: number | undefined;
  longitude: number | undefined;
};

export type MetadataDay = {
  date: string;
  countries: string[];
  placeKeys: string[];
};
