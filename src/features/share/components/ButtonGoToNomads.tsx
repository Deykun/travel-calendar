import { Button } from '@/components/button/Button';
import IconMap from '@/components/icons/IconMap';
import useDataStore from '@/features/settings/stores/useDateStore';

export const ButtonGoToNomads = () => {
  const username = useDataStore((store) => store.integration.integrationCode);

  if (!username) {
    return null;
  }

  return (
    <Button tagName="a" href={`https://nomads.com/@${username}`} target="_blank">
      <IconMap />
      <span>{`nomads.com/@${username}`}</span>
    </Button>
  );
};
