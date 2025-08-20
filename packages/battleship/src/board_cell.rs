#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum BoardCell {
    Unknown =  0,
    Miss = 1,
    Hit = 2,
    Ship = 3
}