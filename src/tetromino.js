export const COLORS = {
    I: '#00f0ff',
    J: '#0000ff',
    L: '#ff7f00',
    O: '#ffff00',
    S: '#00ff00',
    T: '#a000f0',
    Z: '#ff0000'
};

export const SHAPES = {
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    J: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    O: [
        [1, 1],
        [1, 1]
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    T: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ]
};

export class Tetromino {
    constructor(type) {
        this.type = type;
        // Deep copy the shape to avoid mutating the global SHAPES object
        this.shape = SHAPES[type].map(row => [...row]);
        this.color = COLORS[type];
        this.x = 0;
        this.y = 0;
    }

    rotate() {
        // Transpose
        const matrix = this.shape;
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        // Reverse rows
        matrix.forEach(row => row.reverse());
    }
}

export function randomPiece() {
    const types = 'IJLOSTZ';
    const type = types[Math.floor(Math.random() * types.length)];
    return new Tetromino(type);
}
