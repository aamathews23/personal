import { describe, test, expect, vi } from 'vitest';
import { createBoard } from '@/utils/battleship';

vi.mock('@aamathews23/battleship-web', () => ({
  wasm_memory: () => ({ buffer: new ArrayBuffer(4) }),
  BattleshipWeb: {
    new: () => ({
      board: () => 0,
    }),
  },
}));

const memory = new Uint8Array([0, 1, 2, 3]);

describe('createBoard()', () => {
  test('adds cells', () => {
    const board = createBoard(memory);
    expect(board[0]).toEqual('unknown');
    expect(board[1]).toEqual('miss');
    expect(board[2]).toEqual('hit');
    expect(board[3]).toEqual('ship');
  });
});
