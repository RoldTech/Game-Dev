document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const newGameButton = document.getElementById('newGameButton');
    const xAccuracyText = document.getElementById('xAccuracy');
    const oAccuracyText = document.getElementById('oAccuracy');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let xMoves = 0;
    let oMoves = 0;
    let xCorrectMoves = 0;
    let oCorrectMoves = 0;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                if (currentPlayer === 'X') {
                    xCorrectMoves++;
                } else {
                    oCorrectMoves++;
                }
                break;
            }
        }
        if (roundWon) {
            showResult(`Player ${currentPlayer} has won!`);
            gameActive = false;
            updateAccuracy(true);
            return;
        }
        if (!board.includes('')) {
            showResult('Game is a draw!');
            gameActive = false;
            updateAccuracy(false);
        }
    };

    const updateAccuracy = (winner) => {
        let xAccuracy = 0;
        let oAccuracy = 0;
        if (winner) {
            if (currentPlayer === 'X') {
                if (xMoves === 3) {
                    xAccuracy = 100;
                } else if (xMoves === 4) {
                    xAccuracy = 50;
                } else if (xMoves === 5) {
                    xAccuracy = 25;
                } else {
                    xAccuracy = xMoves > 0 ? (xCorrectMoves / xMoves * 100).toFixed(2) : 0;
                }
            } else if (currentPlayer === 'O') {
                if (oMoves === 3) {
                    oAccuracy = 100;
                } else if (oMoves === 4) {
                    oAccuracy = 50;
                } else if (oMoves === 5) {
                    oAccuracy = 25;
                } else {
                    oAccuracy = oMoves > 0 ? (oCorrectMoves / oMoves * 100).toFixed(2) : 0;
                }
            }
        } else {
            xAccuracy = xMoves > 0 ? (xCorrectMoves / xMoves * 100).toFixed(2) : 0;
            oAccuracy = oMoves > 0 ? (oCorrectMoves / oMoves * 100).toFixed(2) : 0;
        }
        xAccuracyText.textContent = `${xAccuracy}%`;
        oAccuracyText.textContent = `${oAccuracy}%`;
    };

    const showResult = (message) => {
        resultMessage.textContent = message;
        resultScreen.classList.add('visible');
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        if (currentPlayer === 'X') {
            xMoves++;
        } else {
            oMoves++;
        }
        checkWinner();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameActive) {
            statusText.textContent = `It's ${currentPlayer}'s turn`;
        }
    };

    const restartGame = () => {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        xMoves = 0;
        oMoves = 0;
        xCorrectMoves = 0;
        oCorrectMoves = 0;
        statusText.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
        resultScreen.classList.remove('visible');
        xAccuracyText.textContent = '0%';
        oAccuracyText.textContent = '0%';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    newGameButton.addEventListener('click', restartGame);
});
