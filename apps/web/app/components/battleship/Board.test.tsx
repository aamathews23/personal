import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest';
import { Board } from '@/components/battleship/Board';
import { useBattleshipStore } from '@/stores/battleship';

vi.mock('@/utils/battleship', () => ({
  battleshipWeb: {
    amt_of_turns: vi.fn(() => 0),
    amt_of_hits: vi.fn(() => 0),
    amt_of_misses: vi.fn(() => 0),
    ships_sunk: vi.fn(() => 0),
    is_end: vi.fn(() => false),
    shoot: vi.fn(),
    play_again: vi.fn(),
  },
  getGameBoard: vi.fn(() => new Array(64).fill('unknown')),
}));

describe.todo('<Board />', () => {
  const store = useBattleshipStore.getState();

  beforeEach(() => {
    store.isEnd = false;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('game start view', () => {
    render(<Board />);

    const cells = screen.getAllByRole('button');
    expect(cells).toHaveLength(64);
  });

  test('game end view', () => {
    store.isEnd = true;

    render(<Board />);

    expect(screen.getByText('You win!')).toBeInTheDocument();
    expect(screen.getByText('Turns: 0')).toBeInTheDocument();
    expect(screen.getByText('Hits: 0')).toBeInTheDocument();
    expect(screen.getByText('Misses: 0')).toBeInTheDocument();
    expect(screen.getByText('Ships Sunk: 0')).toBeInTheDocument();

    const playAgainButton = screen.getByTestId('board-play-again-button');
    expect(playAgainButton).toBeInTheDocument();
  });

  test('game cell click', () => {
    const shootSpy = vi.spyOn(store, 'shoot');

    render(<Board />);

    const cell0 = screen.getByTestId('board-cell-0');
    expect(cell0).toBeInTheDocument();

    fireEvent.click(cell0);
    expect(shootSpy).toHaveBeenCalledWith(0);
  });

  test('play again click', () => {
    store.isEnd = true;
    const resetSpy = vi.spyOn(store, 'reset');

    render(<Board />);

    const playAgainButton = screen.getByTestId('board-play-again-button');
    expect(playAgainButton).toBeInTheDocument();

    fireEvent.click(playAgainButton);
    expect(resetSpy).toHaveBeenCalled();
  });
});
