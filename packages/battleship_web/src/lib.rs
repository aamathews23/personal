mod utils;

use wasm_bindgen::prelude::*;
use battleship;

/// Builds the battleship board by placing ships randomly.
///
/// @returns {Uint8Array} The battleship board
#[wasm_bindgen(skip_jsdoc)]
pub fn build_board() -> Vec<u8> {
    utils::set_panic_hook();
    battleship::utils::build()
}

/// Shoots at the given index on the board and returns the result
///
/// - Hit = 1
/// - Miss = 2
/// - Repeat = 3
///
/// @param {number} idx - The index to shoot at (0-99)
/// @param {Uint8Array} board - The battleship board
/// @returns {number} The result of the shot
#[wasm_bindgen(skip_jsdoc)]
pub fn shoot_ship(idx: usize, board: &mut [u8]) -> u8 {
    utils::set_panic_hook();
    battleship::utils::shoot(idx, board)
}

/// Checks if the game has ended (all ships have been sunk)
///
/// @param {Uint8Array} board - The battleship board
/// @returns {boolean}
#[wasm_bindgen]
pub fn is_end_of_game(board: &[u8]) -> bool {
    utils::set_panic_hook();
    battleship::utils::is_end(board)
}
