import { describe, it, expect, beforeEach } from 'vitest';
import { Board, COLS, ROWS } from './src/board.js';
import { Tetromino } from './src/tetromino.js';

describe('Board', () => {
    let board;

    beforeEach(() => {
        board = new Board();
    });

    it('should initialize with empty grid', () => {
        expect(board.grid.length).toBe(ROWS);
        expect(board.grid[0].length).toBe(COLS);
        expect(board.grid[0][0]).toBe(0);
    });

    it('should detect valid moves', () => {
        const piece = new Tetromino('I');
        piece.x = 0;
        piece.y = 0;
        expect(board.isValidMove(piece, 0, 0)).toBe(true);
        expect(board.isValidMove(piece, 1, 0)).toBe(true);
    });

    it('should detect collision with walls', () => {
        const piece = new Tetromino('I');
        piece.x = -1; // Out of bounds left
        piece.y = 0;
        expect(board.isValidMove(piece, 0, 0)).toBe(false);
    });

    it('should clear lines', () => {
        // Fill a row
        board.grid[ROWS - 1] = Array(COLS).fill('#ffffff');
        const linesCleared = board.clearLines();
        expect(linesCleared).toBe(1);
        // Row should be empty (new row added at top)
        expect(board.grid[0].every(c => c === 0)).toBe(true);
    });
});
