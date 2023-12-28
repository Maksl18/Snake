document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const gridSize = 30;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = 'right';
    let gameInterval;

    function drawBoard() {
      for (let y = 1; y <= gridSize; y++) {
        for (let x = 1; x <= gridSize; x++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.x = x;
          cell.dataset.y = y;
          gameBoard.appendChild(cell);
        }
      }
    }

    function drawSnake() {
      snake.forEach(segment => {
        const snakeCell = document.querySelector(`[data-x="${segment.x}"][data-y="${segment.y}"]`);
        snakeCell.classList.add('snake');
      });
    }

    function drawFood() {
      const foodCell = document.querySelector(`[data-x="${food.x}"][data-y="${food.y}"]`);
      foodCell.classList.add('food');
    }

    function moveSnake() {
      const head = { ...snake[0] };
      switch (direction) {
        case 'up':
          head.y--;
          break;
        case 'down':
          head.y++;
          break;
        case 'left':
          head.x--;
          break;
        case 'right':
          head.x++;
          break;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        generateFood();
      } else {
        snake.pop();
      }
      checkCollision();
    }

    function generateFood() {
      const newFoodX = Math.floor(Math.random() * gridSize) + 1;
      const newFoodY = Math.floor(Math.random() * gridSize) + 1;
      food = { x: newFoodX, y: newFoodY };
    }

    function updateGame() {
      gameBoard.querySelectorAll('.cell').forEach(cell => {
        cell.className = 'cell';
      });
      drawSnake();
      drawFood();
      moveSnake();
    }

    function handleKeyPress(event) {
      const key = event.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') {
        direction = 'up';
      } else if (key === 's' || key === 'arrowdown') {
        direction = 'down';
      } else if (key === 'a' || key === 'arrowleft') {
        direction = 'left';
      } else if (key === 'd' || key === 'arrowright') {
        direction = 'right';
      }
    }

    function checkCollision() {
      const head = snake[0];
      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          endGame();
          break;
        }
      }
    }

    function endGame() {
      clearInterval(gameInterval);
      const restart = confirm('Гра закінчена! Бажаєте розпочати нову гру?');
      if (restart) {
        initializeGame();
      }
    }

    function initializeGame() {
      clearInterval(gameInterval); 
      snake = [{ x: 10, y: 10 }];
      food = { x: 15, y: 15 };
      direction = 'right';
      gameInterval = setInterval(updateGame, 200);
    }

    drawBoard();
    drawSnake();
    drawFood();

    document.getElementById('restartButton').addEventListener('click', () => {
      initializeGame();
    });

    document.addEventListener('keydown', handleKeyPress);
  });
