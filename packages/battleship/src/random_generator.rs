use rand::{
    rngs::ThreadRng,
    seq::SliceRandom,
    thread_rng
};

use crate::random_generator_trait::RandomGeneratorTrait;

pub struct RandomGeneratorImpl {
    rng: ThreadRng
}

impl RandomGeneratorImpl {
    pub fn new() -> Self {
        Self {
            rng: thread_rng()
        }
    }
}

impl RandomGeneratorTrait for RandomGeneratorImpl {
    fn generate(&mut self, start: u8, end: u8) -> u8 {
        let choices: Vec<u8> = (start..end).collect();


        match choices.choose(&mut self.rng) {
            Some(num) => *num,
            _ => 0
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate() {
        let mut generator = RandomGeneratorImpl::new();
        let outcome = generator.generate(0, 10);
        assert!(outcome > 0 && outcome <= 10);
    }

    #[test]
    fn test_generate_when_empty() {
        let mut generator = RandomGeneratorImpl::new();
        let outcome = generator.generate(0, 0);
        assert_eq!(outcome, 0);
    }

    #[test]
    fn test_generate_when_invalid() {
        let mut generator = RandomGeneratorImpl::new();
        let outcome = generator.generate(1, 0);
        assert_eq!(outcome, 0);
    }
}