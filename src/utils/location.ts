import i18nEn from '@/locales/en.json';

const countryByLocation: { [location: string]: string | undefined } = {
  'Sri Lanka': 'lk',
  Malta: 'mt',
  'Costa Rica': 'cr',
  Curaçao: 'cw',
  'Czech Republic': 'cz',
  Seychelles: 'sc',
  Martinique: 'fr',
  Malé: 'mv',
  Cyprus: 'cy',
  Paraguay: 'py',
  Belize: 'bz',
  Tajikistan: 'tj',
  Morocco: 'ma',
  Bonaire: 'nl',
  Tachileik: 'mm',
  'Sint Maarten': 'sx',
  'Saint Lucia': 'lc',
  'Antigua and Barbuda': 'ag',
  Carcassonne: 'fr',
  Colombia: 'co',
  Botswana: 'bw',
  Uganda: 'ug',
  Rwanda: 'rw',
  'Isle of Man': 'im',
  Newark: 'us',
  'Denver City': 'us',
  'El Salvador': 'sv',
  Italy: 'it',
  'French Polynesia': 'pf',
  Yangon: 'mm',
  Türkiye: 'tr',
  'Ivory Coast': 'ci',
  'Independent Papua New Guinea': 'pg',
  'Democratic Republic of the Congo': 'cd',
  'Republic of the Congo': 'cg',
  'Falkland Islands': 'fk',
  'The Gambia': 'gm',
  'Dunmore Town': 'bs',
  Nassau: 'bs',
  Tamuning: 'gu',
  Macau: 'mo',
  'Saint Thomas': 'vi',
  'São Tomé and Príncipe': 'st',
  Chuuk: 'fm',
  'Cameron Highlands': 'my',
  'Saint Martin': 'sx',
  Brunei: 'bn',
};

const countryByCountry: { [place: string]: string | undefined } = {
  ia: 'ir',
  oi: 'so',
  ku: 'iq',
  xk: 'ks',
};

export const getCountryCodeFromStringIfPossible = (textToCheck: string | undefined): string => {
  if (!textToCheck) {
    return '';
  }

  const lowerCaseTextToCheck = textToCheck.toLowerCase();

  if (countryByCountry[lowerCaseTextToCheck]) {
    return countryByCountry[lowerCaseTextToCheck];
  }

  if (countryByLocation[textToCheck]) {
    return countryByLocation[textToCheck];
  }

  if (lowerCaseTextToCheck.length === 2) {
    return lowerCaseTextToCheck;
  }

  const countryKeyFromI18n = Object.entries(i18nEn).find(([, value]) => [textToCheck].includes(value));

  if (countryKeyFromI18n) {
    const countryCodeFromI18n = countryKeyFromI18n[0].split('.').at(-1);

    if (countryCodeFromI18n && countryCodeFromI18n.length === 2) {
      return countryCodeFromI18n;
    }
  }

  return '';
};
