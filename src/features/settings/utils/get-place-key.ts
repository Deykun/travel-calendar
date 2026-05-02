import { removeDiacritics } from '../../../utils/text';

type Params = {
  place: string;
  country: string;
};

export const getPlaceKey = ({ place, country }: Params) => {
  return removeDiacritics(`${place}-${country}`).toLowerCase();
};
