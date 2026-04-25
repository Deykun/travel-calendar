import { PaneFilterDate } from "../panes/PaneFilterDate";
import { PaneFilterHome } from "../panes/PaneFilterHome";

export const SidebarFilters = () => {
  return (
    <div className="flex flex-col gap-6">
      <PaneFilterDate />
      <PaneFilterHome />
    </div>
  );
};
