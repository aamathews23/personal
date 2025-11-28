import { create } from 'zustand';
import { build_board, shoot_ship, is_end_of_game } from '@aamathews23/battleship-web';
import { CELL_DEBUG } from '@/utils/env';

export type BattleshipStore = {
  board: number[];
  amtOfTurns: number;
  amtOfHits: number;
  amtOfMisses: number;
  isEnd: boolean;
  isCellDebug: boolean;
  error?: string;
  build: () => void;
  shoot: (idx: number) => void;
  reset: () => void;
};

export const useBattleshipStore = create<BattleshipStore>((set) => ({
  board: [],
  amtOfTurns: 0,
  amtOfHits: 0,
  amtOfMisses: 0,
  isEnd: false,
  isCellDebug: CELL_DEBUG === 1,
  build: () => set({ board: Array.from(build_board()) }),
  shoot: (idx: number) => {
    set((state) => {
      const shotResult = shoot_ship(idx, new Uint8Array(state.board));

      const updatedBoard = [...state.board];
      let amtOfHits = state.amtOfHits;
      let amtOfMisses = state.amtOfMisses;

      if (shotResult === 1) {
        amtOfHits += 1;
        updatedBoard[idx] = 2; // Mark as hit
      } else if (shotResult === 2) {
        amtOfMisses += 1;
        updatedBoard[idx] = 1; // Mark as miss
      }

      const isEnd = is_end_of_game(new Uint8Array(updatedBoard));

      return {
        board: updatedBoard,
        amtOfTurns: state.amtOfTurns + 1,
        amtOfHits,
        amtOfMisses,
        isEnd,
      };
    });
  },
  reset: () => {
    set({
      board: Array.from(build_board()),
      amtOfTurns: 0,
      amtOfHits: 0,
      amtOfMisses: 0,
      isEnd: false,
    });
  },
}));
