---
"@aamathews23/battleship-web": major
"@aamathews23/battleship": patch
---

Update the WASM engine to preform I/O operations rather than maintaing game state.

- Remove the `BattleshipWeb` class and associated methods.
- Update the WASM functions to handle game state externally.
- Update documentation to reflect the new usage pattern.
