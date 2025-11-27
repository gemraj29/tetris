import { describe, it, expect } from 'vitest';
import { Tetromino, SHAPES } from './src/tetromino.js';

describe('Tetromino', () => {
    it('should initialize correctly', () => {
        const piece = new Tetromino('T');
        expect(piece.type).toBe('T');
        expect(piece.shape).toEqual(SHAPES.T);
    });

    it('should rotate correctly', () => {
        const piece = new Tetromino('T');
        // T shape:
        // [0, 1, 0]
        // [1, 1, 1]
        // [0, 0, 0]

        piece.rotate();

        // Rotated T:
        // [0, 1, 0]
        // [0, 1, 1]
        // [0, 1, 0]
        // (Note: exact matrix depends on implementation, but center remains)

        expect(piece.shape).not.toEqual(SHAPES.T);

        // Rotate 3 more times should bring it back
        piece.rotate();
        piece.rotate();
        piece.rotate();
        expect(piece.shape).toEqual(SHAPES.T);
    });
});
