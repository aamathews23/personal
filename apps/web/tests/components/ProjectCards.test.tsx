import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCards, ProjectCardsProps } from '../../app/components/ProjectCards';
import { createRoutesStub } from 'react-router';

const mockProps: ProjectCardsProps = {
  heading: 'My Projects',
  cards: [
    {
      id: '1',
      heading: 'Project One',
      description: 'Description for project one.',
      to: '/project-one',
    },
    {
      id: '2',
      heading: 'Project Two',
      description: 'Description for project two.',
      to: '/project-two',
    },
  ],
};

const createRemixStubWithProps = (props = mockProps) => {
  const RemixStub = createRoutesStub([
    {
      path: '/',
      Component: () => <ProjectCards {...props} />,
    },
  ]);

  return <RemixStub />;
};

describe('ProjectCards', () => {
  test('renders the section and heading', () => {
    render(createRemixStubWithProps());

    expect(screen.getByTestId('project-cards-section')).toBeInTheDocument();
    expect(screen.getByTestId('project-cards-heading')).toHaveTextContent('My Projects');
  });

  test('renders the correct number of cards', () => {
    render(createRemixStubWithProps());

    expect(screen.getAllByTestId('project-card-card')).toHaveLength(mockProps.cards.length);
  });

  test('renders card headings and descriptions', () => {
    render(createRemixStubWithProps());

    const projectCardHeadingElems = screen.getAllByTestId('project-card-heading');
    const projectCardDescriptionElems = screen.getAllByTestId('project-card-description');

    mockProps.cards.forEach((card, idx) => {
      expect(projectCardHeadingElems[idx]).toHaveTextContent(card.heading);
      expect(projectCardDescriptionElems[idx]).toHaveTextContent(card.description);
    });
  });

  test('renders links with correct href', () => {
    render(createRemixStubWithProps());

    const projectCardLinkElems = screen.getAllByTestId('project-card-link');

    mockProps.cards.forEach((card, idx) => {
      expect(projectCardLinkElems[idx]).toHaveAttribute('href', card.to);
    });
  });

  test('renders nothing if cards array is empty', () => {
    render(createRemixStubWithProps({ heading: 'Empty', cards: [] }));

    expect(screen.queryAllByTestId('project-card-card')).toHaveLength(0);
  });

  test('applies hover styles to card', () => {
    render(createRemixStubWithProps());

    const cards = screen.queryAllByTestId('project-card-card');
    fireEvent.mouseOver(cards[0]);

    // Can't test CSS directly, but can check the class is present
    expect(cards[0].className).toContain('hover:border-slate-500');
  });

  test('renders custom heading', () => {
    render(createRemixStubWithProps({ heading: 'Featured Projects', cards: mockProps.cards }));

    expect(screen.getByTestId('project-cards-heading')).toHaveTextContent('Featured Projects');
  });

  test('renders with a single card', () => {
    const singleCardProps: ProjectCardsProps = {
      heading: 'Single Project',
      cards: [
        {
          id: '3',
          heading: 'Project Three',
          description: 'Description for project three.',
          to: '/project-three',
        },
      ],
    };

    render(createRemixStubWithProps({ heading: 'Single Project', cards: singleCardProps.cards }));

    const projectCardHeadingElems = screen.getAllByTestId('project-card-heading');

    expect(screen.getAllByTestId('project-card-card')).toHaveLength(1);
    expect(projectCardHeadingElems[0]).toHaveTextContent('Project Three');
  });

  test('navigates to correct route when link is clicked', async () => {
    const RemixStub = createRoutesStub([
      {
        path: '/',
        Component: () => <ProjectCards {...mockProps} />,
      },
      {
        path: '/project-one',
        Component: () => <div>Page one</div>,
      },
    ]);

    render(<RemixStub initialEntries={['/']} />);

    const projectCardLinks = screen.getAllByTestId('project-card-link');

    fireEvent.click(projectCardLinks[0]);

    expect(await screen.findByText('Page one')).toBeInTheDocument();
  });
});
