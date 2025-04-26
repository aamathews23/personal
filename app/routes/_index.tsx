import type { MetaFunction } from '@remix-run/node';
import classes from '@styles/routes/index.module.scss';

export const meta: MetaFunction = () => {
  return [{ title: 'Welcome' }, { name: 'description', content: 'Welcome to my Remix App!' }];
};

export default function Index() {
  return (
    <div className={classes['index__container']}>
      <h1 className={classes['index__heading']}>Welcome</h1>
      <p className={classes['index__description']}>Hello Remix!</p>
    </div>
  );
}
