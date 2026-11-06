import { useEffect, useRef } from 'react';

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
  const wrapperRef = useRef<HTMLElement>(null);
  const sidebar = useSidebarStore((store) => store.sidebar);
  const isCollapsed = useSidebarStore((store) => store.isCollapsed);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const target = sidebar?.scrollTo ? wrapper.querySelector(`#${sidebar.scrollTo}`) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Target may be absent (e.g. 'data' while integrations are shown) - scroll wrapper to top
    wrapper.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sidebar]);

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
        ref={wrapperRef}
        key={sidebar?.type}
        className={cn(
          'fixed top-0 left-0',
          'h-dvh',
          'overflow-y-scroll',
          '[scrollbar-width:thin]',
          '[scrollbar-color:rgb(255_255_255/0.2)_transparent]',
          'w-100',
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
