# Neon Tetris 🕹️

A modern, high-performance Tetris clone built with vanilla JavaScript, HTML5 Canvas, and CSS3. Features a premium neon aesthetic, glassmorphism UI, and robust unit tests.

![Tetris Gameplay](https://github.com/gemraj29/tetris/raw/main/screenshot.png)
*(Note: Add a screenshot to your repo and update this link)*

## 🚀 Features

*   **Modern Visuals**: Neon glow effects, dark mode, and glassmorphism panels.
*   **Smooth Gameplay**: 60FPS rendering using `requestAnimationFrame`.
*   **Standard Mechanics**: 7-bag randomization, wall kicks (basic), hard drops, and ghost piece (coming soon).
*   **Responsive**: Centers on screen, works on different resolutions.
*   **Code Quality**:
    *   ES6 Modules (`import`/`export`).
    *   Unit Tests via **Vitest**.
    *   No external runtime dependencies (only dev dependencies).

## 🛠️ Installation & Running Locally

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/gemraj29/tetris.git
    cd tetris
    ```

2.  **Install dependencies** (for testing):
    ```bash
    npm install
    ```

3.  **Run the game**:
    Because this project uses ES Modules, you need a local server.
    ```bash
    # Python 3
    python3 -m http.server 8000
    
    # OR using npx
    npx serve .
    ```
    Open `http://localhost:8000` in your browser.

## 🎮 Controls

| Key | Action |
| :--- | :--- |
| `←` / `→` | Move Left / Right |
| `↑` | Rotate |
| `↓` | Soft Drop |
| `Space` | Hard Drop |
| `P` | Pause Game |

## 🧪 Running Tests

We use **Vitest** for unit testing core logic (Board, Tetromino).

```bash
npm test
```

## 📂 Project Structure

```
tetris/
├── src/
│   ├── main.js       # Entry point
│   ├── game.js       # Game loop and state
│   ├── board.js      # Grid logic and collision
│   ├── tetromino.js  # Piece definitions and rotation
│   └── renderer.js   # Canvas rendering
├── index.html        # Game container
├── style.css         # Neon styling
├── vitest.config.js  # Test configuration
└── ...
```

## 🤝 Contributing

1.  Fork the repo.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License.
