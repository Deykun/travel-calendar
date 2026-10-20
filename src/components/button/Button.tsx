import styles from './Button.module.css';

import { cn } from '@/utils/tailwind';

import IconLoader from '../icons/IconLoader';

type Props = {
  tagName?: 'button' | 'a';
  type?: 'submit' | 'button';
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isInverted?: boolean;
  isText?: boolean;
  hasBorder?: boolean;
  dataTestId?: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
};

export const Button = ({
  className = '',
  type,
  tagName,
  children,
  onClick,
  href,
  target,
  rel,
  isDisabled = false,
  isLoading = false,
  dataTestId,
  variant = 'primary',
  size = 'md',
}: Props) => {
  const Tag = tagName || 'button';

  return (
    <Tag
      className={cn(
        styles['button'],
        'relative',
        'group',
        'inline-flex',
        'items-center',
        '*:duration-150',
        '[&>svg]:shrink-0',
        'active:[&>svg]:scale-120',
        'border-2 border-[#d8da51]',
        'text-black',
        'font-medium',
        'transition-bounce',
        {
          'gap-2 py-2 px-4 rounded-xl text-sm [&>svg]:size-6 [&>svg]:first:-ml-1.5 [&>svg]:last:-mr-1.5': size === 'md',
          'gap-1.5 py-1 px-3 rounded-lg text-xs [&>svg]:size-5 [&>svg]:first:-ml-1 [&>svg]:last:-mr-1': size === 'sm',
          'bg-[#d8da51] text-black hover:bg-[#fcff4e] hover:border-[#fcff4e]': variant === 'primary',
          'bg-transparent text-[#d8da51] hover:text-[#fcff4e] hover:border-[#fcff4e]': variant === 'secondary',
          [styles['button--loading'] || '']: isLoading,
        },
        className,
      )}
      type={type}
      onClick={onClick}
      href={href}
      rel={rel}
      target={target}
      disabled={isDisabled}
      data-testid={dataTestId}
    >
      {children}
      {isLoading && (
        <IconLoader
          className={cn(
            'absolute top-1/2 left-1/2 -translate-1/2',
            'starting:scale-150 scale-100',
            'starting:opacity-0 opacity-100',
            'transition-bounce',
            styles['button-loader'],
          )}
        />
      )}
    </Tag>
  );
};
