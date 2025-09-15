import { create } from 'zustand';
import { Battleship } from '@/utils/battleship';
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

export const useBattleshipStore = (battleship: Battleship | null) => {
  return create<BattleshipStore>((set) => ({
    board: battleship ? battleship.getGameBoard(64) : [],
    amtOfTurns: battleship?.amtOfTurns || 0,
    amtOfHits: battleship?.amtOfHits || 0,
    amtOfMisses: battleship?.amtOfMisses || 0,
    shipsSunk: battleship?.shipsSunk || 0,
    isEnd: battleship?.isEnd || false,
    shoot: (idx: number) => {
      if (!battleship) return;

      battleship.shoot(idx);
      set({
        board: battleship.getGameBoard(64),
        amtOfTurns: battleship.amtOfTurns,
        amtOfHits: battleship.amtOfHits,
        amtOfMisses: battleship.amtOfMisses,
        shipsSunk: battleship.shipsSunk,
        isEnd: battleship.isEnd,
      });
    },
    reset: () => {
      if (!battleship) return;

      battleship.playAgain();
      set({
        board: battleship.getGameBoard(64),
        amtOfTurns: battleship.amtOfTurns,
        amtOfHits: battleship.amtOfHits,
        amtOfMisses: battleship.amtOfMisses,
        shipsSunk: battleship.shipsSunk,
        isEnd: battleship.isEnd,
      });
    },
  }));
};
