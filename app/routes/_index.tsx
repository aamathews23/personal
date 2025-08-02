import type { MetaFunction } from '@remix-run/cloudflare';
import { Hero } from '@/components/Hero';

export const meta: MetaFunction = () => {
  return [
    { title: 'Aaron Mathews' },
    { name: 'description', content: 'Welcome to my website. I hope you enjoy your time here!' },
  ];
};

export default function Index() {
  return (
    <main className="mx-auto my-0 flex w-full max-w-[1024px] flex-col items-center justify-center gap-8 px-4 py-8 md:px-8 lg:px-16">
      <Hero
        preheading="Welcome!"
        heading="I’m, Aaron Mathews."
        description="A software engineer, designer, foodie, hockey player and dad."
      />
    </main>
  );
}
