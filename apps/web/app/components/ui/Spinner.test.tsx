import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Spinner } from '@/components/ui/Spinner';

describe('<Spinner />', () => {
  test('mounts', () => {
    render(<Spinner data-testid="spinner" />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
