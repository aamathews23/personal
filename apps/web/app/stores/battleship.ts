import { create } from 'zustand';
import { battleshipWeb, getGameBoard } from '@/utils/battleship';

export const useBattleshipStore = create((set) => ({
  board: getGameBoard(64),
  isEnd: false,
  amtOfTurns: battleshipWeb.amt_of_turns(),
  amtOfHits: battleshipWeb.amt_of_hits(),
  amtOfMisses: battleshipWeb.amt_of_misses(),
  shipsSunk: battleshipWeb.ships_sunk(),
  shoot: (idx: number) => {
    battleshipWeb.shoot(idx);
    set({
      board: getGameBoard(64),
      amtOfTurns: battleshipWeb.amt_of_turns(),
      amtOfHits: battleshipWeb.amt_of_hits(),
      amtOfMisses: battleshipWeb.amt_of_misses(),
      shipsSunk: battleshipWeb.ships_sunk(),
      isEnd: battleshipWeb.is_end(),
    });
  },
  reset: () => {
    battleshipWeb.play_again();
    set({
      board: getGameBoard(64),
      isEnd: false,
      amtOfTurns: battleshipWeb.amt_of_turns(),
      amtOfHits: battleshipWeb.amt_of_hits(),
      amtOfMisses: battleshipWeb.amt_of_misses(),
      shipsSunk: battleshipWeb.ships_sunk(),
    });
  },
}));
