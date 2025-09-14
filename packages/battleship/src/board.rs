use crate::board_cell::BoardCell;

pub struct Board {
    width: usize,
    cells: Vec<BoardCell>
}

impl Board {
    pub fn new(width: usize) -> Self {
        if width == 0 {
            panic!("Uh oh! Please provide a board width greater than 0.");
        }

        let mut cells = Vec::new();

        (0..(width * width)).for_each(|_i| {
            cells.push(BoardCell::Unknown);
        });

        Self {
            width,
            cells
        }
    }

    fn get_index(&self, x: usize, y: usize) -> usize {
        x * self.width + y
    }

    pub fn get_cells(&self) -> &Vec<BoardCell> {
        &self.cells
    }

    pub fn get_cell(&self, x: usize, y: usize) -> BoardCell {
        self.cells[self.get_index(x, y)]
    }

    pub fn set_cell(&mut self, x: usize, y: usize, new_value: BoardCell) {
        let idx = self.get_index(x, y);
        self.cells[idx] = new_value;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let board = Board::new(8);
        assert_eq!(board.cells.len(), 64);
        assert_eq!(board.cells[0], BoardCell::Unknown);
    }

    #[test]
    fn test_get_index() {
        let board = Board::new(8);

        assert_eq!(board.get_index(0, 0), 0);
        assert_eq!(board.get_index(0, 1), 1);
        assert_eq!(board.get_index(2, 5), 21);
    }

    #[test]
    #[should_panic(expected = "Uh oh! Please provide a board width greater than 0.")]
    fn test_new_size_zero() {
        Board::new(0);
    }

    #[test]
    fn test_get_cells() {
        let board = Board::new(8);
        let cell = board.get_cell(0, 0);

        assert_eq!(cell, BoardCell::Unknown);
    }

    #[test]
    fn test_set_cell() {
        let mut board = Board::new(8);

        assert_eq!(board.cells[0], BoardCell::Unknown);
        board.set_cell(0, 0, BoardCell::Hit);
        assert_eq!(board.cells[0], BoardCell::Hit);
    }
}