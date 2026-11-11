import { Button } from '@/components/button/Button';
import IconX from '@/components/icons/IconX';
import { cn } from '@/utils/tailwind';

import { collapseSidebar, useSidebarStore } from '../stores/useSidebarStore';

type Props = {
  className?: string;
};

export const SidebarToggle = ({ className = '' }: Props) => {
  const isCollapsed = useSidebarStore((store) => store.isCollapsed);

  return (
    <Button
      className={cn(className, { 'opacity-0 pointer-events-none': isCollapsed })}
      onClick={collapseSidebar}
      variant="secondary"
    >
      <IconX />
    </Button>
  );
};
