mod utils;

use wasm_bindgen::prelude::*;
use battleship;

#[wasm_bindgen]
pub fn build_board() -> Vec<u8> {
    utils::set_panic_hook();
    battleship::utils::build()
}

#[wasm_bindgen]
pub fn shoot_ship(idx: usize, board: &mut [u8]) -> u8 {
    utils::set_panic_hook();
    battleship::utils::shoot(idx, board)
}

#[wasm_bindgen]
pub fn is_end_of_game(board: &[u8]) -> bool {
    utils::set_panic_hook();
    battleship::utils::is_end(board)
}
