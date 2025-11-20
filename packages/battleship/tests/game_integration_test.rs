use battleship::{
    board_cell::BoardCell,
    utils::{build, is_end, shoot}, shot_result::ShotResult,
};

#[test]
fn test_start_game() {
    let mut carrier_count = 0;
    let mut battleship_count = 0;
    let mut cruiser_submarine_count = 0;
    let mut destroyer_count = 0;

    let board = build();

    println!("{:?}", board);

    for cell in board {
        if cell == BoardCell::Carrier as u8 {
            carrier_count += 1;
        }

        if cell == BoardCell::Battleship as u8 {
            battleship_count += 1;
        }

        if cell == BoardCell::Cruiser as u8 {
            cruiser_submarine_count += 1;
        }

        if cell == BoardCell::Submarine as u8 {
            cruiser_submarine_count += 1;
        }

        if cell == BoardCell::Destroyer as u8 {
            destroyer_count += 1;
        }
    }

    assert_eq!(carrier_count, 5);
    assert_eq!(battleship_count, 4);
    assert_eq!(cruiser_submarine_count, 6);
    assert_eq!(destroyer_count, 2);
}

#[test]
fn test_shoot_hit() {
    let mut board = build();
    let mut idx: usize = 0;

    for y in 0..10 {
        for x in 0..10 {
            let index: usize = y * 10 + x;
            if board[index] == BoardCell::Carrier.into() {
                idx = index;
                break;
            }
        }
    }

    let shot_result = shoot(idx, &mut board);

    assert_eq!(shot_result, ShotResult::Hit as u8);
}

#[test]
fn test_shoot_miss() {
    let mut board = build();
    let mut idx: usize = 0;

    for y in 0..10 {
        for x in 0..10 {
            let index: usize = y * 10 + x;
            if board[index] == BoardCell::Unknown.into() {
                idx = index;
                break;
            }
        }
    }

    let shot_result = shoot(idx, &mut board);

    assert_eq!(shot_result, ShotResult::Miss as u8);
}

#[test]
fn test_shoot_repeat() {
    let mut board = build();
    let mut idx: usize = 0;

    for y in 0..10 {
        for x in 0..10 {
            let index: usize = y * 10 + x;
            if board[index] == BoardCell::Unknown.into() {
                idx = index;
                break;
            }
        }
    }

    let shot_result = shoot(idx, &mut board);

    assert_eq!(shot_result, ShotResult::Miss as u8);
}

#[test]
fn test_is_end() {
    let mut board = build();
    let mut ship_coords = Vec::new();

    for y in 0..10 {
        for x in 0..10 {
            let index: usize = y * 10 + x;
            if board[index] == BoardCell::Carrier.into()
                || board[index] == BoardCell::Battleship.into()
                || board[index] == BoardCell::Cruiser.into()
                || board[index] == BoardCell::Submarine.into()
                || board[index] == BoardCell::Destroyer.into()  {
                ship_coords.push((x as u8, y as u8));
            }
        }
    }

    for ship_coord in ship_coords {
        let index = ship_coord.1 * 10 + ship_coord.0;
        let shot_result = shoot(index as usize, &mut board);

        assert_eq!(shot_result, 1);
    }

    assert!(is_end(&board));
}
