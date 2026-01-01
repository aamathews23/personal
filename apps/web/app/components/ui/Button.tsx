import { clsx } from 'clsx/lite';

export type ButtonProps = {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  'data-testid'?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({
  className,
  type = 'button',
  variant = 'primary',
  'data-testid': dataTestId = 'button',
  children,
  onClick,
}: ButtonProps) => {
  const base =
    'font-roboto min-h-10 min-w-32 rounded-sm border-2 border-solid text-base transition-all duration-300 outline-none hover:cursor-pointer';
  const primary =
    'border-slate-600 bg-slate-600 text-slate-100 hover:border-slate-800 hover:bg-slate-800 focus:border-slate-800 focus:bg-slate-800';
  const secondary =
    'border-slate-600 bg-slate-100 text-slate-600 hover:border-slate-600 hover:bg-slate-600 hover:text-slate-100 focus:border-slate-600 focus:bg-slate-600 focus:text-slate-100';

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={clsx(base, variant === 'secondary' ? secondary : primary, className)}
      type={type}
      data-button-variant={variant}
      data-testid={dataTestId}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};
