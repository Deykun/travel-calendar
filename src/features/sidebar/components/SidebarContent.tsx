import { SidebarCountry } from '@/features/calendar/sidebars/SidebarCountry';
import { SidebarDay } from '@/features/calendar/sidebars/SidebarDay';
import { SidebarMonth } from '@/features/calendar/sidebars/SidebarMonth';
import { SidebarFilters } from '@/features/filters/sidebars/SidebarFilters';
import { SidebarSettings } from '@/features/settings/sidebars/SidebarSettings';

import { useSidebarStore } from '../stores/useSidebarStore';

export const SidebarContent = () => {
  const sidebar = useSidebarStore((store) => store.sidebar);

  if (sidebar?.type === 'setting') {
    return <SidebarSettings />;
  }

  if (sidebar?.type === 'day' && sidebar?.dayKey) {
    return <SidebarDay dayKey={sidebar.dayKey} />;
  }

  if (sidebar?.type === 'month' && sidebar?.monthNumber) {
    return <SidebarMonth monthNumber={sidebar.monthNumber} />;
  }

  if (sidebar?.type === 'filters') {
    return <SidebarFilters />;
  }

  if (sidebar?.type === 'country' && sidebar?.countryCode) {
    return <SidebarCountry countryCode={sidebar.countryCode} />;
  }

  return null;
};
