import { FC } from 'react';
import { cn } from '@/lib/utils';

type Level = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';

interface TypographyProps {
  level: Level;
  children: React.ReactNode;
  className?: string;
}

const baseStyles = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl',
  h5: 'scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl',
  h6: 'scroll-m-20 text-base font-semibold tracking-tight lg:text-lg',
  body1: 'text-base leading-7 md:text-lg md:leading-8',
  body2: 'text-sm leading-6 md:text-base md:leading-7',
};

const elementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
} as const;

export const Typography: FC<TypographyProps> = ({ level, children, className }) => {
  const Component = elementMap[level];
  return (
    <Component className={cn(baseStyles[level], className)}>
      {children}
    </Component>
  );
};
