import classes from '@styles/components/hero.module.scss';

export type HeroProps = {
  preheading?: string;
  heading: string;
  description: string;
};

export const Hero = ({ preheading, heading, description }: HeroProps) => (
  <section
    className={classes.hero}
    data-testid="hero"
  >
    {preheading && (
      <span
        className={classes['hero__preheading']}
        data-testid="hero-preheading"
      >
        {preheading}
      </span>
    )}
    <h1
      className={classes['hero__heading']}
      data-testid="hero-heading"
    >
      {heading}
    </h1>
    <p
      className={classes['hero__description']}
      data-testid="hero-description"
    >
      {description}
    </p>
  </section>
);
