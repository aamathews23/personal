# @aamathews23/battleship-web

## 2.0.0

### Major Changes

- 6eae17c: Remove the wasm_memory method as it is unused.

## 1.1.0

### Minor Changes

- 9708245:
  - Updates WASM packge to be strictly built with `wasm-bindgen@v0.2.104` on the `1.76.0` Rust toolchain.
  - Include updates to `wasm-bindgen-test` and `web-sys` dependencies.
  - Removes the `BattleshipWeb.play_again()` function as the `BattleshipWeb` instance should be recreated instead of reused.

## 1.0.3

### Patch Changes

- 92c0b7f:
  - Add LICENSE file.
  - Add better package metadata.

## 1.0.2

### Patch Changes

- 7cb12aa: Updates package.json properties to properly bundle the package.

## 1.0.1

### Patch Changes

- 3e9bb56:
  - Adds a README.md file for the package.
  - Updates the package to be publicly scoped.

## 1.0.0

### Major Changes

- d82e505: The initial release of the @aamathews23/battleship-web WASM package.
