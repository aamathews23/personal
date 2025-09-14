use std::{
    collections::{
        HashMap,
        HashSet
    },
    fmt::Display
};

use crate::{
    direction::Direction,
    random_generator_trait::RandomGeneratorTrait,
    ship::Ship,
    shoot_trait::{
        ShootTrait,
        ShootTraitResult
    }
};

pub enum ShipCoords {
    Idx(usize),
    Hit
}

pub enum ShipYardError {
    Empty,
    Full,
    IndexOutOfBounds
}

impl Display for ShipYardError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ShipYardError::Empty => write!(f, "Uh oh! There are no ships in the yard..."),
            ShipYardError::Full => write!(f, "Uh oh! The ship yard is full..."),
            ShipYardError::IndexOutOfBounds => write!(f, "Uh oh! The ship you are requesting does not exist...")
        }
    }
}

pub struct ShipYard {
    board_size: u32,
    capacity: usize,
    ships: Vec<Ship>,
    ship_coords: HashMap<(u32, u32), ShipCoords>
}

/// A class for ship management in the battleship game.
impl ShipYard {
    pub fn new(board_size: u32, capacity: usize) -> Self {
        Self {
            board_size,
            capacity,
            ships: Vec::new(),
            ship_coords: HashMap::new()
        }
    }

    fn build_ship(&mut self, size: u32, generator: &mut dyn RandomGeneratorTrait) {
        if !self.has_capacity() {
            panic!("{}", ShipYardError::Full)
        }

        let mut coords_cache = HashSet::new();
        let ship = Ship::new(size);

        let mut is_valid = false;
        while !is_valid {
            let ship_direction = &ship.direction;
            let ship_size = &ship.size;
            let s = generator.generate(0, self.board_size - ship_size);
            let e = s + ship_size;
            let static_idx = generator.generate(0, self.board_size - ship_size);

            match ship_direction {
                Direction::Horizontal => {
                    for x in s..e {
                        let key = (x, static_idx);
                        if self.ship_coords.contains_key(&key) {
                            coords_cache.clear();
                            break;
                        }
                        coords_cache.insert(key);
                    }
                },
                Direction::Vertical => {
                    for y in s..e {
                        let key = (y, static_idx);
                        if self.ship_coords.contains_key(&key) {
                            coords_cache.clear();
                            break;
                        }
                        coords_cache.insert(key);
                    }
                }
            }

            if !coords_cache.is_empty() {
                is_valid = true;
            }
        }

        for coords in coords_cache {
            self.ship_coords.insert(coords, ShipCoords::Idx(self.ships.len()));
        }

        self.ships.push(ship);
    }

    pub fn build_destroyer(&mut self, generator: &mut dyn RandomGeneratorTrait) {
        self.build_ship(2, generator);
    }

    pub fn build_cruiser(&mut self, generator: &mut dyn RandomGeneratorTrait) {
        self.build_ship(3, generator);
    }

    pub fn build_battleship(&mut self, generator: &mut dyn RandomGeneratorTrait) {
        self.build_ship(4, generator);
    }

    pub fn get_ship(&mut self, idx: usize) -> &mut Ship {
        if self.get_yard_size() == 0 {
            panic!("{}", ShipYardError::Empty);
        }

        if idx >= self.get_yard_size() {
            panic!("{}", ShipYardError::IndexOutOfBounds);
        }

        &mut self.ships[idx]
    }

    pub fn get_yard_size(&self) -> usize {
        self.ships.len()
    }

    pub fn has_capacity(&self) -> bool {
        self.ships.len() < self.capacity
    }

    pub fn are_all_ships_sunk(&self) -> bool {
        if self.get_yard_size() == 0 {
            panic!("{}", ShipYardError::Empty);
        }

        for ship in &self.ships {
            if ship.health > 0 {
                return false;
            }
        }

        true
    }

    pub fn get_ship_coords(&self) -> &HashMap<(u32, u32), ShipCoords> {
        &self.ship_coords
    }
}

impl ShootTrait for ShipYard {
    fn shoot(&mut self, x: u32, y: u32) -> ShootTraitResult {
        let key = (x, y);

        match self.ship_coords.get(&key) {
            Some(ship_coord) => {
                match ship_coord {
                    ShipCoords::Idx(idx) => {
                        let ship = self.get_ship(idx.to_owned());
                        ship.hit();
                        if ship.health == 0 {
                            return ShootTraitResult::Sunk;
                        }

                        self.ship_coords.insert(key, ShipCoords::Hit);

                        ShootTraitResult::Hit
                    },
                    ShipCoords::Hit => ShootTraitResult::Repeat
                }
            },
            None => ShootTraitResult::Miss
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::random_generator_trait::MockRandomGeneratorTrait;

    use super::*;

    fn build_ship_yard() -> ShipYard {
        ShipYard::new(8, 3)
    }

    #[test]
    fn test_new() {
        let ship_yard = build_ship_yard();
        assert_eq!(ship_yard.ships.len(), 0);
    }

    #[test]
    fn test_build_ship_when_empty() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_ship(1, &mut mock);

        assert!(true);
    }

    #[test]
    fn test_build_ship_when_occupied() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_ship(1, &mut mock);

        assert!(true);
    }

    #[test]
    #[should_panic = "Uh oh! The ship yard is full..."]
    fn test_build_ship_when_full() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);
        let mut ship_yard = ShipYard::new(8, 0);
        ship_yard.build_ship(1, &mut mock);
    }

    #[test]
    fn test_build_destroyer() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_destroyer(&mut mock);

        let key = (0, 0);

        assert_eq!(ship_yard.ships.len(), 1);
        assert_eq!(ship_yard.ships[0].size, 2);
        assert!(ship_yard.ship_coords.contains_key(&key));
    }

    #[test]
    fn test_build_cruiser() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_cruiser(&mut mock);

        let key = (0, 0);

        assert_eq!(ship_yard.ships.len(), 1);
        assert_eq!(ship_yard.ships[0].size, 3);
        assert!(ship_yard.ship_coords.contains_key(&key));
    }

    #[test]
    fn test_build_battleship() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_battleship(&mut mock);

        let key = (0, 0);

        assert_eq!(ship_yard.ships.len(), 1);
        assert_eq!(ship_yard.ships[0].size, 4);
        assert!(ship_yard.ship_coords.contains_key(&key));
    }

    #[test]
    fn test_get_ship() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_destroyer(&mut mock);
        assert_eq!(ship_yard.get_ship(0).size, 2);
    }

    #[test]
    #[should_panic = "Uh oh! There are no ships in the yard..."]
    fn test_get_ship_empty_yard() {
        let mut ship_yard = build_ship_yard();
        ship_yard.get_ship(0);
    }

    #[test]
    #[should_panic = "Uh oh! The ship you are requesting does not exist..."]
    fn test_get_ship_index_out_of_bounds_at_length() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_destroyer(&mut mock);
        ship_yard.get_ship(1);
    }

    #[test]
    #[should_panic = "Uh oh! The ship you are requesting does not exist..."]
    fn test_get_ship_index_out_of_bounds_greater_than_length() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_destroyer(&mut mock);
        ship_yard.get_ship(2);
    }

    #[test]
    fn test_get_yard_size() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        assert_eq!(ship_yard.get_yard_size(), 0);
        ship_yard.build_destroyer(&mut mock);
        assert_eq!(ship_yard.get_yard_size(), 1);
    }

    #[test]
    fn test_has_capacity() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = ShipYard::new(8, 1);
        assert!(ship_yard.has_capacity());
        ship_yard.build_destroyer(&mut mock);
        assert!(!ship_yard.has_capacity());
    }

    #[test]
    fn test_are_all_ships_sunk() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate()
            .returning(|_s, _e| 0);

        let mut ship_yard = build_ship_yard();
        ship_yard.build_destroyer(&mut mock);
        assert!(!ship_yard.are_all_ships_sunk());
        ship_yard.ships[0].hit();
        ship_yard.ships[0].hit();
        assert!(ship_yard.are_all_ships_sunk());
    }

    #[test]
    #[should_panic = "Uh oh! There are no ships in the yard..."]
    fn test_are_all_ships_sunk_empty_yard() {
        let ship_yard = build_ship_yard();
        ship_yard.are_all_ships_sunk();
    }
}