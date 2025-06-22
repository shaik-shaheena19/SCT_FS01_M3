const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) {
      statusText.textContent = `${currentPlayer}'s Turn`;
    }
  });
});

function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinner(condition);
      statusText.textContent = `🎉 Congratulations ${board[a]}! 🎉`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function highlightWinner(indices) {
  indices.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "X's Turn";
}
