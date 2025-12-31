import { useEffect, useState } from 'react';
import type { MetaFunction } from 'react-router';
import init from '@aamathews23/battleship-web';
import { Hero } from '@/components/Hero';
import { Board } from '@/components/battleship/Board';
import { Spinner } from '@/components/ui/Spinner';
import { useBattleshipStore } from '@/stores/battleship';

export const meta: MetaFunction = () => {
  return [
    { title: 'Aaron Mathews | Battleship' },
    { name: 'description', content: 'Sink all the ships to win!' },
  ];
};

const Battleship = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const build = useBattleshipStore((state) => state.build);

  useEffect(() => {
    setIsLoading(true);
    init()
      .then(() => build())
      .catch(() => setIsError(true))
      .finally(() => setTimeout(() => setIsLoading(false), 1000));
  }, [build]);

  return (
    <main className="mx-auto my-0 flex w-full max-w-[1024px] flex-col items-center justify-center gap-8 px-4 py-8 md:px-8 lg:px-16">
      <Hero
        heading="Battleship"
        description="Sink all the ships to win!"
      />
      <section className="flex h-[800px] max-h-[800px] w-[800px] max-w-[800px] flex-col items-center justify-center gap-8 rounded-lg bg-blue-800 p-4">
        {isLoading ? (
          <div className="font-roboto flex items-center gap-2 text-base text-slate-100">
            <Spinner />
            Initializing Battleship...
          </div>
        ) : isError ? (
          <div className="font-roboto text-base text-slate-100">
            Uh oh! An error occurred when initializing Battleship...
          </div>
        ) : (
          <Board />
        )}
      </section>
    </main>
  );
};

export default Battleship;
