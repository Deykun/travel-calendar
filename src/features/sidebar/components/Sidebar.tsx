import { ButtonFilter } from '@/features/filters/components/ButtonFilter';
import { ButtonSettings } from '@/features/settings/components/ButtonSettings';
import { cn } from '@/utils/tailwind';

import { useSidebarStore } from '../stores/useSidebarStore';
import { SidebarContent } from './SidebarContent';
import { SidebarToggle } from './SidebarToggle';

type Props = {
  className?: string;
};

export function Sidebar({ className = '' }: Props) {
  const isCollapsed = useSidebarStore((store) => store.isCollapsed);

  return (
    <aside
      className={cn(
        'fixed top-0 left-0',
        'h-dvh',
        'overflow-auto',
        'w-95',
        'max-w-full',
        'py-6 px-2 sm:p-6',
        'bg-[#111110]',
        'border-r-2 border-r-[#2b2b27]',
        'duration-500',
        {
          '-translate-x-full': isCollapsed,
        },
        className,
      )}
    >
      <header className={cn('flex flex-wrap gap-3', 'bg-[#111110] pt-6 mb-6')}>
        <ButtonSettings />
        <ButtonFilter />
        <SidebarToggle className="ml-auto [@media(min-width:860px)]:hidden" />
      </header>
      <SidebarContent />
    </aside>
  );
}
