import { PaneIntegration } from "../panes/PaneIntegration";
import { PaneLanguage } from "../panes/PaneLanguage";

export function SidebarSettings() {
  return (
    <div className="flex flex-col gap-6">
      <PaneIntegration />
      <PaneLanguage />
    </div>
  );
}
