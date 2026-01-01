import { Button } from '@/components/ui/Button';
import { useBattleshipStore } from '@/stores/battleship';

export const EndOfGame = () => {
  const amtOfTurns = useBattleshipStore((state) => state.amtOfTurns);
  const amtOfHits = useBattleshipStore((state) => state.amtOfHits);
  const amtOfMisses = useBattleshipStore((state) => state.amtOfMisses);
  const reset = useBattleshipStore((state) => state.reset);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-blue-300">
      <h2 className="font-noto-serif text-heading-base lg:text-heading-lg font-bold text-slate-950">
        You win!
      </h2>
      <div className="flex max-w-[300px] flex-row flex-wrap items-center justify-center gap-4">
        <p className="font-roboto text-base text-slate-950">Turns: {amtOfTurns}</p>
        <p className="font-roboto text-base text-slate-950">Hits: {amtOfHits}</p>
        <p className="font-roboto text-base text-slate-950">Misses: {amtOfMisses}</p>
      </div>
      <Button
        data-testid="board-play-again-button"
        onClick={() => reset()}
      >
        Play Again
      </Button>
    </div>
  );
};
