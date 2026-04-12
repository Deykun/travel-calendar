export type DateLike = Date | number | string;

export type MetadataPlace = {
  key: string;
  name: string;
  country: string;
  latitude: number | undefined;
  longitude: number | undefined;
  tripsKeys: string[];
};

export type MetadataDay = {
  date: string;
  countriesCodes: string[];
  placeKeys: string[];
  tripsKeys: string[];
};

export type MetadataTrip = {
  key: string;
  placeKey: string;
  countryCode: string;
  from: string;
  to: string;
  days: number;
};

export type Flag = {
  countryCode: string;
  year?: string;
};
