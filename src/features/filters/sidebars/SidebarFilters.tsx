import { PaneFilterDate } from "../panes/PaneFilterDate";
import { PaneFilterHome } from "../panes/PaneFilterHome";

type Props = {
  className?: string;
};

export const SidebarFilters = ({ className = "" }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <PaneFilterDate />
      <PaneFilterHome />
    </div>
  );
};
