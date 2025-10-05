use crate::board_cell::BoardCell;

pub struct Board {
    cells: [u8; 100]
}

impl Board {
    pub fn new() -> Self {
        Board {
            cells: [0; 100]
        }
    }

    fn get_index(&self, x: usize, y: usize) -> usize {
        x * 10 + y
    }

    pub fn get_cells(&self) -> &[u8; 100] {
        &self.cells
    }

    pub fn get_cell(&self, x: usize, y: usize) -> BoardCell {
        self.cells[self.get_index(x, y)].into()
    }

    pub fn set_cell(&mut self, x: usize, y: usize, new_value: BoardCell) {
        let idx = self.get_index(x, y);
        self.cells[idx] = new_value.into();
    }

    pub fn reset_cells(&mut self) {
        self.cells = [0; 100];
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let board = Board::new();
        assert_eq!(board.cells.len(), 100);
        assert_eq!(board.cells[0], 0);
    }

    #[test]
    fn test_get_index() {
        let board = Board::new();

        assert_eq!(board.get_index(0, 0), 0);
        assert_eq!(board.get_index(0, 1), 1);
        assert_eq!(board.get_index(2, 5), 25);
    }

    #[test]
    fn test_get_cells() {
        let board = Board::new();
        let cell = board.get_cell(0, 0);

        assert_eq!(cell, BoardCell::Unknown);
    }

    #[test]
    fn test_set_cell() {
        let mut board = Board::new();
        let cell_unknown = board.get_cell(0, 0);
        board.set_cell(0, 0, BoardCell::Hit);
        let cell_hit = board.get_cell(0, 0);

        assert_eq!(cell_unknown, BoardCell::Unknown);
        assert_eq!(cell_hit, BoardCell::Hit);
    }

    #[test]
    fn test_reset_cells() {
        let mut board = Board::new();
        board.set_cell(0, 0, BoardCell::Hit);
        board.reset_cells();
        let cell = board.get_cell(0, 0);

        assert_eq!(cell, BoardCell::Unknown);
    }
}