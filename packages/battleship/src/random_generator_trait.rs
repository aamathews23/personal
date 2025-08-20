use mockall::automock;

#[automock]
pub trait RandomGeneratorTrait {
    fn generate(&mut self, start: u32, end: u32) -> u32;
}