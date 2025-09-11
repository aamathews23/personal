import type { MetaFunction } from '@remix-run/cloudflare';
import { Hero } from '@/components/Hero';
import { Board } from '@/components/battleship/Board';

export const meta: MetaFunction = () => {
  return [
    { title: 'Aaron Mathews | Battleship' },
    { name: 'description', content: 'Sink all the ships to win!' },
  ];
};

const Battleship = () => (
  <main className="mx-auto my-0 flex w-full max-w-[1024px] flex-col items-center justify-center gap-8 px-4 py-8 md:px-8 lg:px-16">
    <Hero
      heading="Battleship"
      description="Sink all the ships to win!"
    />
    <Board />
  </main>
);

export default Battleship;
