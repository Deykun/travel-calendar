declare module 'coordinate_to_country' {
  /**
   * @param latitude
   * @param longitude
   * @param isoA2 `true` -> 2-letter codes (e.g. "PL"), `false`/omitted -> 3-letter codes (e.g. "POL")
   * @returns codes of countries containing the coordinate, `[]` if none
   */
  const coordinateToCountry: (latitude: number, longitude: number, isoA2?: boolean) => string[];

  export default coordinateToCountry;
}
