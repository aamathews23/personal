mod utils;

use wasm_bindgen::prelude::*;

use battleship::{
    board_cell::BoardCell,
    game::Game,
    game_trait::GameTrait,
    shoot_trait::ShootTrait
};

/**
 * TODO: Add wasm bindgen tests
 * TODO: Add E2E Playwright tests
 * TODO: Refactor build and deploy pipeline
 */

#[wasm_bindgen]
pub fn wasm_memory() -> JsValue {
    wasm_bindgen::memory()
}

#[wasm_bindgen]
pub struct BattleshipWeb {
    game: Game
}

#[wasm_bindgen]
impl BattleshipWeb {
    pub fn new() -> Self {
        utils::set_panic_hook();
        let mut game: Game = Game::new(8);
        game.start_game();

        Self {
            game
        }
    }

    pub fn amt_of_turns(&self) -> u32 {
        self.game.amt_of_turns
    }

    pub fn amt_of_hits(&self) -> u32 {
        self.game.amt_of_hits
    }

    pub fn amt_of_misses(&self) -> u32 {
        self.game.amt_of_misses
    }

    pub fn ships_sunk(&self) -> u32 {
        self.game.ships_sunk
    }

    pub fn is_end(&self) -> bool {
        self.game.is_end()
    }

    pub fn board(&self) -> *const BoardCell {
        self.game.board.get_cells().as_ptr()
    }

    pub fn shoot(&mut self, idx: u32) {
        let x = idx / 8;
        let y = idx % 8;
        self.game.shoot(x, y);
    }

    pub fn play_again(&mut self) {
        self.game = Game::new(8);
        self.game.start_game();
    }
}

impl Default for BattleshipWeb {
    fn default() -> Self {
        Self::new()
    }
}