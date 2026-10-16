import { PaneFilterDate } from '../panes/PaneFilterDate';
import { PaneFilterHome } from '../panes/PaneFilterHome';
import { PaneVisibilityCalendar } from '../panes/PaneVisibilityCalendar';
import { PaneVisibilityStreaks } from '../panes/PaneVisibilityStreaks';

export const SidebarFilters = () => {
  return (
    <div className="flex flex-col gap-6">
      <PaneVisibilityCalendar />
      <PaneVisibilityStreaks />
      <PaneFilterDate />
      <PaneFilterHome />
    </div>
  );
};
