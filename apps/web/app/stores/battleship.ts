import { create } from 'zustand';
import { battleshipWeb, getGameBoard } from '@/utils/battleship';
import { BoardCellVariant } from '@/types';

export type BattleshipStore = {
  board: BoardCellVariant[];
  amtOfTurns: number;
  amtOfHits: number;
  amtOfMisses: number;
  shipsSunk: number;
  isEnd: boolean;
  shoot: (idx: number) => void;
  reset: () => void;
};

export const useBattleshipStore = create<BattleshipStore>((set) => ({
  board: getGameBoard(64),
  amtOfTurns: battleshipWeb.amt_of_turns(),
  amtOfHits: battleshipWeb.amt_of_hits(),
  amtOfMisses: battleshipWeb.amt_of_misses(),
  shipsSunk: battleshipWeb.ships_sunk(),
  isEnd: battleshipWeb.is_end(),
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
      amtOfTurns: battleshipWeb.amt_of_turns(),
      amtOfHits: battleshipWeb.amt_of_hits(),
      amtOfMisses: battleshipWeb.amt_of_misses(),
      shipsSunk: battleshipWeb.ships_sunk(),
      isEnd: battleshipWeb.is_end(),
    });
  },
}));
