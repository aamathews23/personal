import { Link } from 'react-router';

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
    <section
      className="flex w-full flex-col gap-8"
      data-testid="project-cards-section"
    >
      <h2
        className="font-noto-serif text-heading-sm lg:text-heading-base font-bold text-slate-950"
        data-testid="project-cards-heading"
      >
        {heading}
      </h2>
      <div
        className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3"
        data-testid="project-cards-list"
      >
        {cards.map((card) => (
          <article
            className="relative flex flex-col gap-4 rounded-lg border-2 border-slate-300 p-4 transition-colors hover:border-slate-500"
            key={card.id}
            data-testid="project-card-card"
          >
            <Link
              className="font-roboto text-lg font-bold text-slate-950 after:absolute after:top-0 after:left-0 after:h-full after:w-full hover:underline"
              to={card.to}
              data-testid="project-card-link"
            >
              <h3 data-testid="project-card-heading">{card.heading}</h3>
            </Link>
            <p
              className="font-roboto text-base text-slate-950"
              data-testid="project-card-description"
            >
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
