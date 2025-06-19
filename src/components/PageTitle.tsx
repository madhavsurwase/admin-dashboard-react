import type { ReactNode } from 'react';

interface PageTitleProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export function PageTitle({ title, children, className }: PageTitleProps) {
  return (
    <div className={`flex items-center justify-between mb-8 ${className}`}>
      <h1 className="text-3xl font-headline font-semibold text-foreground">
        {title}
      </h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
