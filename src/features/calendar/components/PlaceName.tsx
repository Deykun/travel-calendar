import useDataStore from "@/features/integrations/stores/use-data-store";

type Props = {
  placeKey: string;
};

export const PlaceName = ({ placeKey }: Props) => {
  const place = useDataStore((store) => store.placesByKey[placeKey]);

  return place?.name;
};
