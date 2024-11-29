// script.js

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsAiButton = document.getElementById('player-vs-ai');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let againstAI = false;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    statusDisplay.textContent = 'It\'s a tie!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  if (againstAI && currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
};

const checkWin = () => {
  return winningConditions.some(condition => 
    condition.every(index => gameState[index] === currentPlayer)
  );
};

const aiMove = () => {
  const emptyCells = gameState
    .map((cell, index) => (cell === '' ? index : null))
    .filter(index => index !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameState[randomIndex] = currentPlayer;
  cells[randomIndex].textContent = currentPlayer;

  if (checkWin()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    statusDisplay.textContent = 'It\'s a tie!';
    gameActive = false;
    return;
  }

  currentPlayer = 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
};

const startGame = (ai = false) => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  againstAI = ai;
  cells.forEach(cell => (cell.textContent = ''));
  statusDisplay.textContent = 'Player X\'s turn';
};

playerVsPlayerButton.addEventListener('click', () => startGame(false));
playerVsAiButton.addEventListener('click', () => startGame(true));
restartButton.addEventListener('click', () => startGame(againstAI));
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
