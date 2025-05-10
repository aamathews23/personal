import type { MetaFunction } from '@remix-run/node';
import { Hero } from '@/components/Hero';
import classes from '@styles/routes/index.module.scss';

export const meta: MetaFunction = () => {
  return [{ title: 'Welcome' }, { name: 'description', content: 'Welcome to my Remix App!' }];
};

export default function Index() {
  return (
    <main className={classes.index}>
      <Hero
        preheading="Welcome!"
        heading="I’m, Aaron Mathews."
        description="A software engineer, designer, foodie, hockey player and dad."
      />
    </main>
  );
}
