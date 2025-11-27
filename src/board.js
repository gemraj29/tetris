export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;

export class Board {
    constructor() {
        this.reset();
    }

    reset() {
        this.grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    isValidMove(piece, offsetX, offsetY) {
        return piece.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = piece.x + dx + offsetX;
                let y = piece.y + dy + offsetY;
                return (
                    value === 0 ||
                    (this.isInside(x, y) && this.grid[y][x] === 0)
                );
            });
        });
    }

    isInside(x, y) {
        return x >= 0 && x < COLS && y < ROWS; // y >= 0 check omitted for top entry
    }

    lockPiece(piece) {
        piece.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value > 0) {
                    let y = piece.y + dy;
                    let x = piece.x + dx;
                    if (y >= 0) { // Only lock if on board
                        this.grid[y][x] = piece.color;
                    }
                }
            });
        });
    }

    clearLines() {
        let linesCleared = 0;
        this.grid.forEach((row, y) => {
            if (row.every(value => value !== 0)) {
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
                linesCleared++;
            }
        });
        return linesCleared;
    }
}
