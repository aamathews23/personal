import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BoardCell } from '@/components/battleship/BoardCell';
import { BoardCellVariant } from '@/types';

describe('<BoardCell />', () => {
  const onClick = vi.fn();

  const renderComponent = (variant: BoardCellVariant = 'unknown') =>
    render(
      <BoardCell
        idx={0}
        variant={variant}
        onClick={onClick}
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
      renderComponent('hit');
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-board-cell-variant', 'hit');
      expect(button).toHaveAttribute('aria-label', 'Hit!');
    });

    test('renders the miss variant', () => {
      renderComponent('miss');
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-board-cell-variant', 'miss');
      expect(button).toHaveAttribute('aria-label', 'Miss...');
    });

    test('renders the ship variant', () => {
      renderComponent('ship');
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-board-cell-variant', 'ship');
      expect(button).toHaveAttribute('aria-label', 'Ship.');
    });
  });

  describe('functionality', () => {
    test('click event handler fires when button is clicked', () => {
      renderComponent();
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });
  });
});
