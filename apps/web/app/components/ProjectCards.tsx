import { Link } from '@remix-run/react';

export type ProjectCardsProps = {
  heading: string;
  cards: {
    id: string;
    heading: string;
    description: string;
    to: string;
  }[];
};

export const ProjectCards = ({ heading, cards }: ProjectCardsProps) => {
  return (
    <section className="flex w-full flex-col gap-8">
      <h2 className="font-noto-serif text-heading-sm lg:text-heading-base font-bold text-slate-950">
        {heading}
      </h2>
      <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <article
            className="relative flex flex-col gap-4 rounded-lg border-2 border-slate-300 p-4 transition-colors hover:border-slate-500"
            key={card.id}
          >
            <Link
              className="font-roboto text-lg font-bold text-slate-950 after:absolute after:top-0 after:left-0 after:h-full after:w-full hover:underline"
              to={card.to}
            >
              <h3>{card.heading}</h3>
            </Link>
            <p className="font-roboto text-base text-slate-950">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
