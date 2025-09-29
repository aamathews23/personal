---
"@aamathews23/battleship-web": minor
---

- Updates WASM packge to be strictly built with `wasm-bindgen@v0.2.93` on the `1.76.0` Rust toolchain.
- Removes the `BattleshipWeb.play_again()` function as the `BattleshipWeb` instance should be recreated instead of reused.
