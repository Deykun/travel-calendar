import { ButtonFilter } from '@/features/filters/components/ButtonFilter';
import { ButtonSettings } from '@/features/settings/components/ButtonSettings';
import { cn } from '@/utils/tailwind';

import { collapseSidebar, useSidebarStore } from '../stores/useSidebarStore';
import { SidebarContent } from './SidebarContent';
import { SidebarToggle } from './SidebarToggle';

type Props = {
  className?: string;
};

export function Sidebar({ className = '' }: Props) {
  const isCollapsed = useSidebarStore((store) => store.isCollapsed);

  return (
    <>
      <button
        className={cn(
          'fixed top-0 left-0 w-full h-dvh',
          'bg-black z-20 opacity-20',
          '[@media(min-width:860px)]:hidden',
          'opacity-60',
          'duration-500',
          {
            'opacity-0 pointer-events-none': isCollapsed,
          },
        )}
        onClick={collapseSidebar}
      />
      <aside
        className={cn(
          'fixed top-0 left-0',
          'h-dvh',
          'overflow-auto',
          'w-95',
          'max-w-full',
          'p-2 sm:p-6',
          'bg-[#111110]',
          'border-r-2 border-r-[#2b2b27]',
          'duration-500',
          'transition-transform',
          {
            '-translate-x-full [@media(min-width:860px)]:translate-x-0': isCollapsed,
          },
          className,
        )}
      >
        <header
          className={cn(
            'flex flex-col',
            '[@media(min-width:860px)]:flex-row [@media(min-width:860px)]:flex-wrap gap-3',
            'mb-6',
          )}
        >
          <SidebarToggle className="ml-auto [@media(min-width:860px)]:hidden" />
          <ButtonSettings />
          <ButtonFilter />
        </header>
        <SidebarContent />
      </aside>
    </>
  );
}
