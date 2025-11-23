# battleship_web

This is a WASM library for the Battleship game.

## Usage

Install the package:
```sh
npm install @aamathews23/battleship-web
```

Initialize WASM and start the game:
```js
import init, {
  build_board,
  shoot_ship,
  is_end_of_game,
} from '@aamathews23/battleship-web';

init().then((wasm) => {
  const board = build_board();

  const result = shoot_ship(3, 5);

  if (result === 1) {
    console.log('Hit!');
  } else if (result === 2) {
    console.log('Miss!');
  } else {
    console.log('Already shot here!');
  }

  if (is_end_of_game()) {
    console.log('Game Over!');
  }
});
```
