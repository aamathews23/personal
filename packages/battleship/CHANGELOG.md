# @aamathews23/battleship

## 0.1.1

### Patch Changes

- 5a6179c: Update the WASM engine to preform I/O operations rather than maintaing game state.

  - Remove the `BattleshipWeb` class and associated methods.
  - Update the WASM functions to handle game state externally.
  - Update documentation to reflect the new usage pattern.
