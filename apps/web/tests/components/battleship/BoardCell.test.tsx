import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BoardCell } from '@/components/battleship/BoardCell';

describe('<BoardCell />', () => {
  const onClick = vi.fn();

  const renderComponent = (variant: number = 0) =>
    render(
      <BoardCell
        idx={0}
        variant={variant}
      />,
    );

  describe('variants', () => {
    test('defaults to the unknown variant', () => {
      renderComponent();
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-board-cell-variant', 'unknown');
      expect(button).toHaveAttribute('aria-label', 'Unknown.');
    });

    test('renders the hit variant', () => {
      renderComponent(2);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-board-cell-variant', 'hit');
      expect(button).toHaveAttribute('aria-label', 'Hit!');
    });

    test('renders the miss variant', () => {
      renderComponent(1);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-board-cell-variant', 'miss');
      expect(button).toHaveAttribute('aria-label', 'Miss...');
    });

    // TODO: Add back with proper mocking of the Zustand store, #53
    test.skip('renders the ship variant', () => {
      renderComponent(3);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-board-cell-variant', 'ship');
      expect(button).toHaveAttribute('aria-label', 'Ship.');
    });
  });

  // TODO: Add back with proper mocking of the Zustand store, #53
  describe.skip('functionality', () => {
    test('click event handler fires when button is clicked', () => {
      renderComponent();
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });
  });
});
