use crate::random_generator_trait::RandomGeneratorTrait;

#[derive(Debug, PartialEq)]
pub enum Direction {
    Horizontal,
    Vertical
}

impl Direction {
    pub fn random(generator: &mut dyn RandomGeneratorTrait) -> Direction {
        let direction = generator.generate(0, 1);

        if direction == 0 {
            Direction::Horizontal
        } else {
            Direction::Vertical
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::random_generator_trait::MockRandomGeneratorTrait;

    use super::*;

    #[test]
    fn test_horizontal() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate().returning(|_s, _e| 0);

        assert_eq!(Direction::random(&mut mock), Direction::Horizontal);
    }

    #[test]
    fn test_vertical() {
        let mut mock = MockRandomGeneratorTrait::new();
        mock.expect_generate().returning(|_s, _e| 1);

        assert_eq!(Direction::random(&mut mock), Direction::Vertical);
    }
}