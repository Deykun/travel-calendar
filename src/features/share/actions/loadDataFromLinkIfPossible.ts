import { refreshFiltered, setHomeCountriesCodes } from '@/features/filters/stores/useFilterStore';
import { getDataFromNomads } from '@/features/settings/actions/get-data-from-nomads';
import { openSidebarFilters } from '@/features/sidebar/stores/useSidebarStore';

import { setShareState } from '../stores/useShareStore';

export const loadDataFromLinkIfPossible = async (hash: string) => {
  try {
    const params = hash
      .replace('#', '')
      .split('&')
      .reduce((stack: { [param: string]: string }, part) => {
        const [key, value] = part.split(':');

        if (typeof key === 'string' && typeof value === 'string') {
          stack[key] = value;
        }

        return stack;
      }, {});

    if (params.u) {
      setShareState('loading');

      const response = await getDataFromNomads({ username: params.u });

      if (response.isSuccess) {
        openSidebarFilters();
        refreshFiltered();

        const homeCountriesCodes = 'h' in params ? params.h.split('-') : [];
        setHomeCountriesCodes(homeCountriesCodes);
      }
    }
  } catch {
    //
  }

  setShareState('ready');
};
