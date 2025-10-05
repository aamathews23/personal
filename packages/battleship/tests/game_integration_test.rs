use battleship::{
    board_cell::BoardCell,
    game::Game,
    shoot_trait::ShootTrait
};

#[test]
fn test_new() {
    let game = Game::new();
    assert_eq!(game.amt_of_turns, 0);
    assert_eq!(game.amt_of_hits, 0);
    assert_eq!(game.amt_of_misses, 0);
}

#[test]
fn test_start_game() {
    let mut game = Game::new();
    game.play();

    let mut count = 0;
    for y in 0..10 {
        for x in 0..10 {
            if game.board.get_cell(x, y) == BoardCell::Ship {
                count += 1;
            }
        }
    }

    assert_eq!(game.amt_of_turns, 0);
    assert_eq!(game.amt_of_hits, 0);
    assert_eq!(game.amt_of_misses, 0);
    assert_eq!(count, 9);
}

#[test]
fn test_shoot_hit() {
    let mut game = Game::new();
    game.play();

    let mut x_coord = 0;
    let mut y_coord = 0;

    for y in 0..10 {
        for x in 0..10 {
            if game.board.get_cell(x, y) == BoardCell::Ship {
                x_coord = x;
                y_coord = y;
                break;
            }
        }
    }

    game.shoot(x_coord as u8, y_coord as u8);

    assert!(game.amt_of_hits > 0);
    assert_eq!(game.amt_of_misses, 0);
    assert!(game.amt_of_turns > 0);
}

#[test]
fn test_shoot_miss() {
    let mut game = Game::new();
    game.play();

    let mut x_coord = 0;
    let mut y_coord = 0;

    for y in 0..10 {
        for x in 0..10 {
            if game.board.get_cell(x, y) == BoardCell::Unknown {
                x_coord = x;
                y_coord = y;
                break;
            }
        }
    }

    game.shoot(x_coord as u8, y_coord as u8);

    assert_eq!(game.amt_of_hits, 0);
    assert!(game.amt_of_misses > 0);
    assert!(game.amt_of_turns > 0);
}

#[test]
fn test_shoot_repeat() {
    let mut game = Game::new();
    game.play();

    let mut x_coord = 0;
    let mut y_coord = 0;

    for y in 0..10 {
        for x in 0..10 {
            if game.board.get_cell(x, y) == BoardCell::Ship {
                x_coord = x as u8;
                y_coord = y as u8;
                break;
            }
        }
    }

    game.shoot(x_coord, y_coord);

    assert_eq!(game.amt_of_hits, 1);
    assert_eq!(game.amt_of_misses, 0);
    assert_eq!(game.amt_of_turns, 1);

    game.shoot(x_coord, y_coord);

    assert_eq!(game.amt_of_hits, 1);
    assert_eq!(game.amt_of_misses, 0);
    assert_eq!(game.amt_of_turns, 2);
}

#[test]
fn test_shoot_sunk() {
    let mut game = Game::new();
    game.play();

    let mut ship_coords = Vec::new();
    for y in 0..10 {
        for x in 0..10 {
            if game.board.get_cell(x, y) == BoardCell::Ship {
                if game.board.get_cell(x + 1, y) == BoardCell::Ship {
                    let mut x_coord = x;
                    let y_coord = y;
                    while game.board.get_cell(x_coord, y_coord) == BoardCell::Ship {
                        ship_coords.push((x_coord, y_coord));
                        x_coord += 1;
                    }
                    break;
                }

                if game.board.get_cell(x, y + 1) == BoardCell::Ship {
                    let x_coord = x;
                    let mut y_coord = y;
                    while game.board.get_cell(x_coord, y_coord) == BoardCell::Ship {
                        ship_coords.push((x_coord, y_coord));
                        y_coord += 1;
                    }
                    break;
                }
            }
        }
    }

    for ship_coord in ship_coords {
        game.shoot(ship_coord.0 as u8, ship_coord.1 as u8);
    }

    assert!(game.ships_sunk > 0);
}

#[test]
fn test_is_end() {
    let mut game = Game::new();
    game.play();

    let mut ship_coords = Vec::new();
    for y in 0..10 {
        for x in 0..10 {
            if game.board.get_cell(x, y) == BoardCell::Ship {
                ship_coords.push((x as u8, y as u8));
            }
        }
    }

    for ship_coord in ship_coords {
        game.shoot(ship_coord.0, ship_coord.1);
        assert!(game.amt_of_hits > 0);
        assert!(game.amt_of_turns > 0);
    }

    assert!(game.is_end());
}

#[test]
fn test_reset() {
    let mut game = Game::new();
    game.play();

    let mut ship_coords = Vec::new();
    for y in 0..10 {
        for x in 0..10 {
            if game.board.get_cell(x, y) == BoardCell::Ship {
                ship_coords.push((x as u8, y as u8));
            }
        }
    }

    for ship_coord in ship_coords {
        game.shoot(ship_coord.0, ship_coord.1);
        assert!(game.amt_of_hits > 0);
        assert!(game.amt_of_turns > 0);
    }

    assert!(game.is_end());

    game.reset();

    assert_eq!(game.amt_of_hits, 0);
    assert_eq!(game.amt_of_misses, 0);
    assert_eq!(game.amt_of_turns, 0);
    assert_eq!(game.ships_sunk, 0);
    assert_eq!(game.is_end(), false);

    let mut played_cell_count = 0;
    for y in 0..10 {
        for x in 0..10 {
            let cell = game.board.get_cell(x, y);
            if cell == BoardCell::Hit || cell == BoardCell::Miss {
                played_cell_count += 1;
            }
        }
    }

    assert_eq!(played_cell_count, 0);
}