pub enum ShotResult {
    Hit = 1,
    Miss = 2,
    Repeat = 3,
}

impl Into<u8> for ShotResult {
    fn into(self) -> u8 {
        self as u8
    }
}