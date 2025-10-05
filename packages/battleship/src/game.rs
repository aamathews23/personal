use crate::{
    board::Board,
    board_cell::BoardCell,
    random_generator::RandomGeneratorImpl,
    ship_yard::ShipYard,
    shoot_trait::{
        ShootTrait,
        ShootTraitResult
    }
};

pub struct Game {
    pub amt_of_turns: u8,
    pub amt_of_hits: u8,
    pub amt_of_misses: u8,
    pub ships_sunk: u8,
    pub board: Board,
    ship_yard: ShipYard
}

impl Game {
    pub fn new() -> Self {
        Self {
            amt_of_turns: 0,
            amt_of_hits: 0,
            amt_of_misses: 0,
            ships_sunk: 0,
            board: Board::new(),
            ship_yard: ShipYard::new(3)
        }
    }

    pub fn play(&mut self) {
        let mut generator = RandomGeneratorImpl::new();

        self.ship_yard.build_destroyer(&mut generator);
        self.ship_yard.build_cruiser(&mut generator);
        self.ship_yard.build_battleship(&mut generator);

        for ship_coord in self.ship_yard.get_ship_coords().keys() {
            let x = ship_coord.0;
            let y = ship_coord.1;
            self.board.set_cell(x as usize, y as usize, BoardCell::Ship);
        }
    }

    pub fn reset(&mut self) {
        self.amt_of_turns = 0;
        self.amt_of_hits = 0;
        self.amt_of_misses = 0;
        self.ships_sunk = 0;
        self.board.reset_cells();
        self.ship_yard.clear_ships();
        self.play();
    }

    pub fn is_end(&self) -> bool {
        self.ship_yard.are_all_ships_sunk()
    }
}

impl ShootTrait for Game {
    /// Determines if a ship was hit.
    fn shoot(&mut self, x: u8, y: u8) -> ShootTraitResult {
        let shot_result = self.ship_yard.shoot(x, y);

        self.amt_of_turns += 1;
        match shot_result {
            ShootTraitResult::Hit => {
                self.amt_of_hits += 1;
                self.board.set_cell(x as usize, y as usize, BoardCell::Hit);
            },
            ShootTraitResult::Miss => {
                self.amt_of_misses += 1;
                self.board.set_cell(x as usize, y as usize, BoardCell::Miss);
            },
            ShootTraitResult::Sunk => {
                self.amt_of_hits += 1;
                self.ships_sunk += 1;
                self.board.set_cell(x as usize, y as usize, BoardCell::Hit);
            },
            ShootTraitResult::Repeat => {} // do nothing
        }

        shot_result
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let mut game = Game::new();
        game.play();

        assert_eq!(game.amt_of_hits, 0);
        assert_eq!(game.amt_of_misses, 0);
        assert_eq!(game.amt_of_turns, 0);
        assert_eq!(game.ships_sunk, 0);
        assert_eq!(game.is_end(), false);
    }
}