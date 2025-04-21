const BOARD_SIZE = 10;
const SHIP_SIZES = [5, 4, 3, 3, 2]; // Battleship-style fleet

function generateRandomBoard() {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(null)
  );

  const ships = [];

  for (let size of SHIP_SIZES) {
    let placed = false;

    while (!placed) {
      const isHorizontal = Math.random() < 0.5;
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);

      const positions = [];

      for (let i = 0; i < size; i++) {
        const r = isHorizontal ? row : row + i;
        const c = isHorizontal ? col + i : col;

        if (r >= BOARD_SIZE || c >= BOARD_SIZE || board[r][c]) {
          break;
        }

        positions.push({ row: r, col: c });
      }

      if (positions.length === size) {
        for (const pos of positions) {
          board[pos.row][pos.col] = true;
        }

        ships.push({
          size,
          positions,
          isSunk: false,
        });

        placed = true;
      }
    }
  }

  return {
    ships,
    hits: [],
    misses: [],
  };
}

export default generateRandomBoard;
