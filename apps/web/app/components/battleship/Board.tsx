import { useBattleshipStore } from '@/stores/battleship';
import { BoardCells } from '@/components/battleship/BoardCells';
import { EndOfGame } from '@/components/battleship/EndOfGame';

export const Board = () => {
  const isEnd = useBattleshipStore((state) => state.isEnd);

  return <>{isEnd ? <EndOfGame /> : <BoardCells />}</>;
};
