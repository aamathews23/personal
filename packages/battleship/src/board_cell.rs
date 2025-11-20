#[derive(PartialEq, Eq)]
pub enum BoardCell {
    Unknown =  0,
    Miss = 1,
    Hit = 2,
    Destroyer = 3,
    Cruiser = 4,
    Submarine = 5,
    Battleship = 6,
    Carrier = 7,
}

impl From<u8> for BoardCell {
    fn from(value: u8) -> Self {
        match value {
            1 => BoardCell::Miss,
            2 => BoardCell::Hit,
            3 => BoardCell::Destroyer,
            4 => BoardCell::Cruiser,
            5 => BoardCell::Submarine,
            6 => BoardCell::Battleship,
            7 => BoardCell::Carrier,
            _ => BoardCell::Unknown
        }
    }
}

impl Into<u8> for BoardCell {
    fn into(self) -> u8 {
        self as u8
    }
}