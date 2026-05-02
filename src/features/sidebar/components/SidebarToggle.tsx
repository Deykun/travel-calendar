import { Button } from '@/components/button/Buttonn';
import IconX from '@/components/icons/IconX';
import { cn } from '@/utils/tailwind';

import { collapseSidebar } from '../stores/useSidebarStore';

type Props = {
  className?: string;
};

export const SidebarToggle = ({ className = '' }: Props) => {
  return (
    <Button className={cn(className)} onClick={collapseSidebar} variant="secondary">
      <IconX />
    </Button>
  );
};
