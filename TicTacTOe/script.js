const boxes = document.querySelectorAll('.box');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let gameOver = false;

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]           // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (boxes[a].classList.contains(currentPlayer) && boxes[b].classList.contains(currentPlayer) && boxes[c].classList.contains(currentPlayer)) {
      return true;
    }
  }

  return false;
}

function updateStatus() {
  if (checkWinner()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
  } else if ([...boxes].every(box => box.classList.contains('X') || box.classList.contains('O'))) {
    status.textContent = "It's a draw!";
    gameOver = true;
  } else {
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (!box.textContent && !gameOver) {
      box.textContent = currentPlayer;
      box.classList.add(currentPlayer);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }
  });
});

resetButton.addEventListener('click', () => {
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('X', 'O');
  });
  currentPlayer = 'X';
  gameOver = false;
  updateStatus();
});

updateStatus();
