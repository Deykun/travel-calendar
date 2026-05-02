import useDataStore from '@/features/settings/stores/useDateStore';

type Props = {
  placeKey: string;
};

export const PlaceName = ({ placeKey }: Props) => {
  const place = useDataStore((store) => store.placesByKey[placeKey]);

  return place?.name;
};
