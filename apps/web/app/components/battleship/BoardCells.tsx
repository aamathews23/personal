import { useBattleshipStore } from '@/stores/battleship';
import { BoardCell } from '@/components/battleship/BoardCell';

export const BoardCells = () => {
  const board = useBattleshipStore((state) => state.board);

  return (
    <div className="grid grid-cols-10 gap-2">
      {board &&
        board.map((cell, idx) => (
          <BoardCell
            key={`game-square-${idx}`}
            idx={idx}
            variant={cell}
          />
        ))}
    </div>
  );
};
