export type DateLike = Date | number | string;

export type DateYYYYMMDD = `${number}-${number}-${number}`;
export type DateMMDD = `${number}-${number}`;

export type MetadataPlace = {
  key: string;
  name: string;
  country: string;
  latitude: number | undefined;
  longitude: number | undefined;
  tripsKeys: string[];
};

export type MetadataDay = {
  date: DateYYYYMMDD;
  countriesCodes: string[];
  placeKeys: string[];
  tripsKeys: string[];
};

export type MetadataTrip = {
  key: string;
  placeKey: string;
  countryCode: string;
  from: DateYYYYMMDD;
  to: DateYYYYMMDD;
  days: number;
};

export type Flag = {
  countryCode: string;
  year?: string;
};
