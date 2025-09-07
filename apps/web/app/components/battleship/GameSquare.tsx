import { clsx } from 'clsx/lite';
import { GameSquareVariant } from '@/types';

export type GameSquareProps = {
  variant?: GameSquareVariant;
};

export const GameSquare = ({ variant = 'unknown' }: GameSquareProps) => {
  const basic =
    'h-16 w-16 rounded-sm border-none transition-all duration-300 outline-none hover:cursor-pointer hover:border hover:border-solid hover:border-slate-600 focus:border focus:border-solid focus:border-slate-600';
  const unknown = 'bg-blue-300 hover:bg-blue-600 focus:bg-blue-600';
  const ship = 'bg-orange-300 hover:bg-orange-600 focus:bg-orange-600';
  const hit = 'bg-green-300';
  const miss = 'bg-red-300';

  let ariaLabel = 'Unknown.';
  let classes = clsx(basic, unknown);
  switch (variant) {
    case 'miss':
      ariaLabel = 'Miss...';
      classes = clsx(basic, miss);
      break;
    case 'hit':
      ariaLabel = 'Hit!';
      classes = clsx(basic, hit);
      break;
    case 'ship':
      ariaLabel = 'Ship.';
      classes = clsx(basic, ship);
      break;
  }

  return (
    <button
      className={classes}
      aria-label={ariaLabel}
      data-testid="game-square"
    />
  );
};
