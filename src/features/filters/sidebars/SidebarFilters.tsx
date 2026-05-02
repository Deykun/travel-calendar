import { PaneFilterDate } from '../panes/PaneFilterDate';
import { PaneFilterHome } from '../panes/PaneFilterHome';
import { PaneVisibility } from '../panes/PaneVisibility';

export const SidebarFilters = () => {
  return (
    <div className="flex flex-col gap-6">
      <PaneVisibility />
      <PaneFilterDate />
      <PaneFilterHome />
    </div>
  );
};
