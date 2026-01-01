import { Buzzy } from '@/components/global/Buzzy';

export type HeroProps = {
  preheading?: string;
  heading: string;
  description: string;
};

export const Hero = ({ preheading, heading, description }: HeroProps) => (
  <section
    className="flex w-full flex-col items-center gap-8"
    data-testid="hero"
  >
    <Buzzy />
    <div className="w-full">
      {preheading && (
        <span
          className="font-roboto pb-4 text-base text-slate-950"
          data-testid="hero-preheading"
        >
          {preheading}
        </span>
      )}
      <h1
        className="font-noto-serif text-heading-base lg:text-heading-lg pb-8 font-bold text-slate-950"
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
    </div>
  </section>
);
