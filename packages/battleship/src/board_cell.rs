#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum BoardCell {
    Unknown =  0,
    Miss = 1,
    Hit = 2,
    Ship = 3
}

impl From<u8> for BoardCell {
    fn from(value: u8) -> Self {
        match value {
            1 => BoardCell::Miss,
            2 => BoardCell::Hit,
            3 => BoardCell::Ship,
            _ => BoardCell::Unknown
        }
    }
}

impl Into<u8> for BoardCell {
    fn into(self) -> u8 {
        self as u8
    }
}