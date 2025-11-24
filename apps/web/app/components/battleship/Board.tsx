import { useBattleshipStore } from '@/stores/battleship';
import { BoardCells } from '@/components/battleship/BoardCells';
import { EndOfGame } from '@/components/battleship/EndOfGame';

export const Board = () => {
  const isEnd = useBattleshipStore((state) => state.isEnd);

  return (
    <section className="flex h-[800px] max-h-[800px] w-[800px] max-w-[800px] flex-col items-center justify-center gap-8 rounded-lg bg-blue-800 p-4">
      {isEnd ? <EndOfGame /> : <BoardCells />}
    </section>
  );
};
