import type { MetaFunction } from 'react-router';
import { Hero } from '@/components/Hero';
import { ProjectCards } from '@/components/ProjectCards';

const projects = [
  {
    id: 'battleship',
    heading: 'Battleship',
    description: 'Sink all the ships to win!',
    to: '/battleship',
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: 'Aaron Mathews' },
    { name: 'description', content: 'Welcome to my website. I hope you enjoy your time here!' },
  ];
};

export default function Index() {
  return (
    <main className="mx-auto my-0 flex w-full max-w-[1024px] flex-col items-center justify-center gap-16 px-4 py-8 md:px-8 lg:gap-32 lg:px-16">
      <Hero
        preheading="Welcome!"
        heading="I’m, Aaron Mathews."
        description="A software engineer, designer, foodie, hockey player and dad."
      />
      <ProjectCards
        heading="Projects"
        cards={projects}
      />
    </main>
  );
}
