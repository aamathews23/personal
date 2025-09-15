import { useEffect, useState } from 'react';
import { useBattleshipStore } from '@/stores/battleship';
import { BoardCell } from '@/components/battleship/BoardCell';
import { Button } from '@/components/Button';
import { Battleship } from '@/utils/battleship';

// TODO: add loading state while WASM is loading
export const Board = () => {
  const [battleship, setBattleship] = useState<Battleship | null>(null);

  useEffect(() => {
    const initBattleship = async () => {
      const battleship = new Battleship();
      await battleship.init();
      setBattleship(battleship);
    };

    initBattleship();
  }, []);

  const battleshipStore = useBattleshipStore(battleship);

  const board = battleshipStore((state) => state.board);
  const isEnd = battleshipStore((state) => state.isEnd);
  const amtOfTurns = battleshipStore((state) => state.amtOfTurns);
  const amtOfHits = battleshipStore((state) => state.amtOfHits);
  const amtOfMisses = battleshipStore((state) => state.amtOfMisses);
  const shipsSunk = battleshipStore((state) => state.shipsSunk);
  const shoot = battleshipStore((state) => state.shoot);
  const reset = battleshipStore((state) => state.reset);

  return (
    <section className="flex h-[600px] max-h-[600px] w-[600px] max-w-[600px] flex-col items-center justify-center gap-8 rounded-lg bg-blue-800 p-4">
      {isEnd ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-blue-300">
          <h2 className="font-noto-serif text-heading-base lg:text-heading-lg font-bold text-slate-950">
            You win!
          </h2>
          <div className="flex max-w-[300px] flex-row flex-wrap items-center justify-center gap-4">
            <p className="font-roboto text-base text-slate-950">Turns: {amtOfTurns}</p>
            <p className="font-roboto text-base text-slate-950">Hits: {amtOfHits}</p>
            <p className="font-roboto text-base text-slate-950">Misses: {amtOfMisses}</p>
            <p className="font-roboto text-base text-slate-950">Ships Sunk: {shipsSunk}</p>
          </div>
          <Button
            data-testid="board-play-again-button"
            onClick={() => reset()}
          >
            Play Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-2">
          {board &&
            board.map((gameSquare, idx) => (
              <BoardCell
                key={`game-square-${idx}`}
                idx={idx}
                variant={gameSquare}
                onClick={() => shoot(idx)}
              />
            ))}
        </div>
      )}
    </section>
  );
};
