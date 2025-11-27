import { useBattleshipStore } from '@/stores/battleship';
import { clsx } from 'clsx/lite';

export type BoardCellProps = {
  idx: number;
  variant?: number;
};

export const BoardCell = ({ idx, variant = 0 }: BoardCellProps) => {
  const shoot = useBattleshipStore((state) => state.shoot);

  const basic =
    'h-16 w-16 rounded-sm border-none transition-all duration-300 outline-none hover:cursor-pointer';
  const unknown = 'bg-blue-300 hover:bg-blue-500 focus:bg-blue-500';
  const ship = 'bg-orange-300 hover:bg-orange-600 focus:bg-orange-600';
  const hit = 'bg-green-300';
  const miss = 'bg-red-300';

  let ariaLabel = 'Unknown.';
  let boardCellVariant = 'unknown';
  let classes = clsx(basic, unknown);
  switch (variant) {
    case 1:
      ariaLabel = 'Miss...';
      boardCellVariant = 'miss';
      classes = clsx(basic, miss);
      break;
    case 2:
      ariaLabel = 'Hit!';
      boardCellVariant = 'hit';
      classes = clsx(basic, hit);
      break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      ariaLabel = 'Ship.';
      boardCellVariant = 'ship';
      classes = clsx(basic, ship);
      break;
  }

  const handleOnClick = () => {
    shoot(idx);
  };

  return (
    <button
      className={classes}
      aria-label={ariaLabel}
      data-board-cell-variant={boardCellVariant}
      data-testid={`board-cell-${idx}`}
      onClick={handleOnClick}
    />
  );
};
