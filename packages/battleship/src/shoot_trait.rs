#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ShootTraitResult {
    Repeat = 0,
    Miss = 1,
    Hit = 2,
    Sunk = 3
}

pub trait ShootTrait {
    fn shoot(&mut self, x: u32, y: u32) -> ShootTraitResult;
}