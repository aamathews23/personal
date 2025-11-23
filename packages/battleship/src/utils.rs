use std::collections::{HashMap, HashSet};
use crate::{
    board_cell::BoardCell,
    shot_result::ShotResult,
    random_generator::RandomGenerator,
};

/// Builds a new battleship board with ships placed randomly
pub fn build() -> Vec<u8> {
    let mut generator = RandomGenerator::new();
    let mut ship_coords = HashMap::new();
    let mut coords_cache = HashSet::new();
    let ship_sizes: [(BoardCell, u8); 5] = [
        (BoardCell::Carrier, 5),
        (BoardCell::Battleship, 4),
        (BoardCell::Cruiser, 3),
        (BoardCell::Submarine, 3),
        (BoardCell::Destroyer, 2)
    ];
    let mut board: Vec<u8> = vec![0; 100];

    for (ship, size) in ship_sizes {
        let mut is_valid = false;
        let mut ship_coords_cache = HashSet::new();

        while !is_valid {
            let is_horizontal = generator.generate(0, 1) == 0;

            let s = generator.generate(0, 10 - size);
            let e = s + size;
            let static_idx = generator.generate(0, 10 - size);

            if is_horizontal {
                for x in s..e {
                    let key = (x, static_idx);
                    if coords_cache.contains(&key) {
                        ship_coords_cache.clear();
                        break;
                    }
                    ship_coords_cache.insert(key);
                }
            } else {
                for y in s..e {
                    let key = (static_idx, y);
                    if coords_cache.contains(&key) {
                        ship_coords_cache.clear();
                        break;
                    }
                    ship_coords_cache.insert(key);
                }
            }

            if !ship_coords_cache.is_empty() {
                is_valid = true;
            }
        }

        let ship_key = ship as u8;

        ship_coords.insert(ship_key, HashSet::new());

        // Add ship coords to main coords cache and ship coords map
        for cord in ship_coords_cache {
            coords_cache.insert(cord);
            ship_coords.get_mut(&ship_key).expect("the ship coord set should be initialized").insert(cord);
        }
    }

    // Build board
    for (ship, coords) in ship_coords {
        for (x, y) in coords {
            let idx = y * 10 + x;
            board[idx as usize] = ship;
        }
    }

    board
}

/// Shoots at the given index on the board and returns the result
/// - Hit = 1
/// - Miss = 2
/// - Repeat = 3
pub fn shoot(idx: usize, board: &mut [u8]) -> u8 {
    let cell: BoardCell = BoardCell::from_u8(board[idx]);

    let shot_result = match cell {
        BoardCell::Unknown => ShotResult::Miss,
        BoardCell::Destroyer | BoardCell::Submarine | BoardCell::Cruiser | BoardCell::Battleship | BoardCell::Carrier => ShotResult::Hit,
        _ => ShotResult::Repeat,
    };

    match shot_result {
        ShotResult::Hit => board[idx] = BoardCell::Hit as u8,
        ShotResult::Miss => board[idx] = BoardCell::Miss as u8,
        ShotResult::Repeat => {}
    }

    shot_result as u8
}

/// Checks if the game has ended (all ships have been sunk)
pub fn is_end(board: &[u8]) -> bool {
    let mut is_end = true;
    for cell in board {
        let cell: BoardCell = BoardCell::from_u8(*cell);
        if cell != BoardCell::Unknown && cell != BoardCell::Hit && cell != BoardCell::Miss {
            is_end = false;
            break;
        }
    }

    is_end
}