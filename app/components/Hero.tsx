export type HeroProps = {
  preheading?: string;
  heading: string;
  description: string;
};

export const Hero = ({ preheading, heading, description }: HeroProps) => (
  <section
    className="flex w-full flex-col justify-center gap-8"
    data-testid="hero"
  >
    {preheading && (
      <span
        className="font-roboto text-base text-slate-950"
        data-testid="hero-preheading"
      >
        {preheading}
      </span>
    )}
    <h1
      className="font-noto-serif text-heading-sm lg:text-heading-base font-bold text-slate-950"
      data-testid="hero-heading"
    >
      {heading}
    </h1>
    <p
      className="font-roboto text-base text-slate-950"
      data-testid="hero-description"
    >
      {description}
    </p>
  </section>
);
