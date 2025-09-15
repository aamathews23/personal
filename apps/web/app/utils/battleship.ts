import init, { BattleshipWeb } from '@aamathews23/battleship-web';
import type { BoardCellVariant, WasmMemory } from '@/types';
import { CELL_DEBUG } from '@/utils/env';

// TODO: Add error handling for when WASM fails to load
// TODO: Add JS doc comments
// TODO: Add unit tests
export class Battleship {
  private instance: BattleshipWeb | null;
  private memory: WasmMemory | null;

  constructor() {
    this.instance = null;
    this.memory = null;
  }

  async init() {
    const wasm = await init();

    this.instance = BattleshipWeb.new();
    this.memory = wasm.memory as WasmMemory;
  }

  get amtOfTurns(): number {
    return this.instance?.amt_of_turns() || 0;
  }

  get amtOfHits(): number {
    return this.instance?.amt_of_hits() || 0;
  }

  get amtOfMisses(): number {
    return this.instance?.amt_of_misses() || 0;
  }

  get shipsSunk(): number {
    return this.instance?.ships_sunk() || 0;
  }

  get isEnd(): boolean {
    return this.instance?.is_end() || false;
  }

  shoot(idx: number): void {
    if (!this.instance) return;

    this.instance.shoot(idx);
  }

  playAgain(): void {
    if (!this.instance) return;

    this.instance.play_again();
  }

  getGameBoard(size: number): BoardCellVariant[] {
    if (!this.instance || !this.memory) return [];

    const board = new Uint8Array(this.memory.buffer, this.instance.board(), size);
    const gameBoard: BoardCellVariant[] = [];

    for (const cell of board) {
      if (cell === 1) {
        gameBoard.push('miss');
      } else if (cell === 2) {
        gameBoard.push('hit');
      } else if (cell === 3 && CELL_DEBUG === 1) {
        gameBoard.push('ship');
      } else {
        gameBoard.push('unknown');
      }
    }

    return gameBoard;
  }
}
