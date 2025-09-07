import * as BattleshipWebWasm from '@aamathews/battleship-web';
import type { GameSquareVariant, WasmMemory } from '@/types';
import { CELL_DEBUG } from '@/utils/env';

export const createBoard = (board: Uint8Array<ArrayBuffer>) => {
  const newBoard: GameSquareVariant[] = [];

  for (const cell of board) {
    if (cell === 1) {
      newBoard.push('miss');
    } else if (cell === 2) {
      newBoard.push('hit');
    } else if (cell === 3 && CELL_DEBUG === 1) {
      newBoard.push('ship');
    } else {
      newBoard.push('unknown');
    }
  }

  return newBoard;
};

const memory: WasmMemory = BattleshipWebWasm.wasm_memory();
export const battleshipWeb = BattleshipWebWasm.BattleshipWeb.new();

export const getGameBoard = (size: number): GameSquareVariant[] => {
  const board = new Uint8Array(memory.buffer, battleshipWeb.board(), size);
  return createBoard(board);
};
