import { BLOCK_SIZE, COLS, ROWS } from './board.js';

export class Renderer {
    constructor(canvasId, nextCanvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.nextCanvas = document.getElementById(nextCanvasId);
        this.nextCtx = this.nextCanvas.getContext('2d');

        // Scale for high DPI displays if needed, but keeping simple for now
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;

        this.nextCtx.canvas.width = 4 * BLOCK_SIZE; // Max width of a piece
        this.nextCtx.canvas.height = 4 * BLOCK_SIZE;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
    }

    drawBoard(board) {
        board.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.drawBlock(this.ctx, x, y, value);
                }
            });
        });
    }

    drawPiece(piece) {
        piece.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value > 0) {
                    this.drawBlock(this.ctx, piece.x + dx, piece.y + dy, piece.color);
                }
            });
        });
    }

    drawNextPiece(piece) {
        // Center the piece in the preview box
        const offsetX = (4 - piece.shape[0].length) / 2;
        const offsetY = (4 - piece.shape.length) / 2;

        piece.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value > 0) {
                    this.drawBlock(this.nextCtx, offsetX + dx, offsetY + dy, piece.color);
                }
            });
        });
    }

    drawBlock(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

        // Inner glow/bevel effect
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(x * BLOCK_SIZE + 5, y * BLOCK_SIZE + 5, BLOCK_SIZE - 10, BLOCK_SIZE - 10);
    }
}
