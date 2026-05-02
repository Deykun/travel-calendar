import { type PropsWithChildren } from 'react';

import { cn } from '@/utils/tailwind';

import { Checkbox, type Props } from '../checkbox/Checkbox';
import IconCircle from '../icons/IconCircle';

export const Radiobox = (props: PropsWithChildren<Props>) => {
  return <Checkbox {...props} className={cn(props.className, 'rounded-full!')} frameIcon={IconCircle} />;
};
