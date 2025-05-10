import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Hero, type HeroProps } from '@/components/Hero';

const preheading = 'preheading';
const heading = 'heading';
const description = 'description';

const props: HeroProps = {
  heading,
  description,
};

describe('<Hero />', () => {
  test('mount', () => {
    const { getByTestId, queryByTestId } = render(<Hero {...props} />);
    expect(getByTestId('hero')).toBeInTheDocument();
    expect(queryByTestId('hero-preheading')).not.toBeInTheDocument();
    expect(getByTestId('hero-heading')).toHaveTextContent(heading);
    expect(getByTestId('hero-description')).toHaveTextContent(description);
  });
  test('has the preheading when provided', () => {
    const { getByTestId } = render(
      <Hero
        {...props}
        preheading={preheading}
      />,
    );
    expect(getByTestId('hero-preheading')).toBeInTheDocument();
    expect(getByTestId('hero-preheading')).toHaveTextContent(preheading);
  });
});
