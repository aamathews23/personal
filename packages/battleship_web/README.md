# battleship_web

This is a WASM library for the Battleship game.

## Usage

Install the package:
```sh
npm install @aamathews23/battleship-web
```

Initialize WASM and start the game:
```js
import init, { BattleShipWeb } from "@aamathews23/battleship-web";

init().then((wasm) => {
  const game = BattleShipWeb.new();
  const memory = wasm.memory;

  const board = Uint8Array.from(memory.buffer, game.board(), 64);
});
```
