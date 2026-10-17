import { PaneFilterDate } from '../panes/PaneFilterDate';
import { PaneVisibilityCalendar } from '../panes/PaneVisibilityCalendar';

export const SidebarFilters = () => {
  return (
    <div className="flex flex-col gap-6">
      <PaneVisibilityCalendar />
      <PaneFilterDate />
    </div>
  );
};
