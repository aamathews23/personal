use mockall::automock;

#[automock]
pub trait RandomGeneratorTrait {
    fn generate(&mut self, start: u8, end: u8) -> u8;
}