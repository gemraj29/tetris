import { Board, COLS, ROWS } from './board.js';
import { Renderer } from './renderer.js';
import { randomPiece } from './tetromino.js';

export class Game {
    constructor() {
        this.board = new Board();
        this.renderer = new Renderer('game-board', 'next-piece');

        this.piece = null;
        this.nextPiece = null;

        this.score = 0;
        this.lines = 0;
        this.level = 1;

        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;

        this.isPaused = false;
        this.isGameOver = false;

        this.bindControls();
        this.reset();
    }

    reset() {
        this.board.reset();
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.dropInterval = 1000;
        this.isGameOver = false;
        this.isPaused = false;

        this.piece = randomPiece();
        this.piece.x = Math.floor(COLS / 2) - 1;
        this.piece.y = 0;

        this.nextPiece = randomPiece();

        this.updateUI();
        this.hideGameOver();

        this.lastTime = 0;
        this.dropCounter = 0;

        // Start loop if not already running (handled by main usually, but here we ensure state)
        if (!this.requestId) {
            this.loop();
        }
    }

    start() {
        this.reset();
    }

    loop(time = 0) {
        if (this.isGameOver) return;

        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        if (!this.isPaused) {
            this.dropCounter += deltaTime;
            if (this.dropCounter > this.dropInterval) {
                this.drop();
            }
        }

        this.draw();
        this.requestId = requestAnimationFrame(this.loop.bind(this));
    }

    draw() {
        this.renderer.clear();
        this.renderer.drawBoard(this.board);
        this.renderer.drawPiece(this.piece);

        // Clear next piece canvas and draw next piece
        this.renderer.nextCtx.clearRect(0, 0, this.renderer.nextCanvas.width, this.renderer.nextCanvas.height);
        this.renderer.drawNextPiece(this.nextPiece);
    }

    drop() {
        if (this.board.isValidMove(this.piece, 0, 1)) {
            this.piece.y++;
        } else {
            this.lock();
        }
        this.dropCounter = 0;
    }

    lock() {
        this.board.lockPiece(this.piece);
        const linesCleared = this.board.clearLines();
        if (linesCleared > 0) {
            this.updateScore(linesCleared);
        }

        this.piece = this.nextPiece;
        this.piece.x = Math.floor(COLS / 2) - 1;
        this.piece.y = 0;
        this.nextPiece = randomPiece();

        if (!this.board.isValidMove(this.piece, 0, 0)) {
            this.gameOver();
        }
    }

    move(dir) {
        if (this.isPaused || this.isGameOver) return;
        if (this.board.isValidMove(this.piece, dir, 0)) {
            this.piece.x += dir;
        }
    }

    rotate() {
        if (this.isPaused || this.isGameOver) return;

        // Clone to test rotation
        const clone = JSON.parse(JSON.stringify(this.piece));
        // We need to re-attach the prototype method or just implement rotation logic here
        // Simpler: rotate the piece, check validity, rotate back if invalid
        this.piece.rotate();
        if (!this.board.isValidMove(this.piece, 0, 0)) {
            // Wall kick: try moving left or right
            if (this.board.isValidMove(this.piece, 1, 0)) {
                this.piece.x += 1;
            } else if (this.board.isValidMove(this.piece, -1, 0)) {
                this.piece.x -= 1;
            } else {
                // Rotate back (3 more times = -90 deg)
                this.piece.rotate();
                this.piece.rotate();
                this.piece.rotate();
            }
        }
    }

    hardDrop() {
        if (this.isPaused || this.isGameOver) return;
        while (this.board.isValidMove(this.piece, 0, 1)) {
            this.piece.y++;
            this.score += 2; // Bonus for hard drop
        }
        this.lock();
        this.updateUI();
    }

    updateScore(lines) {
        const points = [0, 100, 300, 500, 800];
        this.score += points[lines] * this.level;
        this.lines += lines;
        this.level = Math.floor(this.lines / 10) + 1;

        // Speed up
        this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);

        this.updateUI();
    }

    updateUI() {
        document.getElementById('score').innerText = this.score;
        document.getElementById('level').innerText = this.level;
        document.getElementById('lines').innerText = this.lines;
    }

    gameOver() {
        this.isGameOver = true;
        cancelAnimationFrame(this.requestId);
        document.getElementById('game-over-overlay').hidden = false;
        document.getElementById('final-score').innerText = this.score;
    }

    hideGameOver() {
        document.getElementById('game-over-overlay').hidden = true;
    }

    togglePause() {
        if (this.isGameOver) return;
        this.isPaused = !this.isPaused;
    }

    bindControls() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.move(-1);
                    break;
                case 'ArrowRight':
                    this.move(1);
                    break;
                case 'ArrowDown':
                    this.drop();
                    break;
                case 'ArrowUp':
                    this.rotate();
                    break;
                case ' ':
                    this.hardDrop();
                    break;
                case 'p':
                case 'P':
                    this.togglePause();
                    break;
            }
            this.draw(); // Immediate feedback
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.reset();
            this.loop();
        });
    }
}
