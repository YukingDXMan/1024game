const gridDisplay = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const width = 4;
let squares = [];
let score = 0;

function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.classList.add('cell');
        square.innerHTML = '';
        gridDisplay.appendChild(square);
        squares.push(square);
    }
    generate();
    generate();
}

function generate() {
    const emptySquares = squares.filter(s => s.innerHTML === "");
    if (emptySquares.length > 0) {
        const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        randomSquare.innerHTML = Math.random() > 0.1 ? 2 : 4;
        updateStyles();
        checkForGameOver();
    }
}

function moveRight() {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 1].innerHTML;
            let totalThree = squares[i + 2].innerHTML;
            let totalFour = squares[i + 3].innerHTML;
            let row = [parseInt(totalOne) || 0, parseInt(totalTwo) || 0, parseInt(totalThree) || 0, parseInt(totalFour) || 0];

            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill('');
            let newRow = zeros.concat(filteredRow);

            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
        }
    }
}

function moveLeft() {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 1].innerHTML;
            let totalThree = squares[i + 2].innerHTML;
            let totalFour = squares[i + 3].innerHTML;
            let row = [parseInt(totalOne) || 0, parseInt(totalTwo) || 0, parseInt(totalThree) || 0, parseInt(totalFour) || 0];

            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill('');
            let newRow = filteredRow.concat(zeros);

            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
        }
    }
}

function moveDown() {
    for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + (width * 2)].innerHTML;
        let totalFour = squares[i + (width * 3)].innerHTML;
        let column = [parseInt(totalOne) || 0, parseInt(totalTwo) || 0, parseInt(totalThree) || 0, parseInt(totalFour) || 0];

        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill('');
        let newColumn = zeros.concat(filteredColumn);

        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + (width * 2)].innerHTML = newColumn[2];
        squares[i + (width * 3)].innerHTML = newColumn[3];
    }
}

function moveUp() {
    for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + (width * 2)].innerHTML;
        let totalFour = squares[i + (width * 3)].innerHTML;
        let column = [parseInt(totalOne) || 0, parseInt(totalTwo) || 0, parseInt(totalThree) || 0, parseInt(totalFour) || 0];

        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill('');
        let newColumn = filteredColumn.concat(zeros);

        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + (width * 2)].innerHTML = newColumn[2];
        squares[i + (width * 3)].innerHTML = newColumn[3];
    }
}

function combineRow() {
    for (let i = 0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== "" && (i + 1) % 4 !== 0) {
            let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
            squares[i].innerHTML = combinedTotal;
            squares[i + 1].innerHTML = "";
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
    }
    checkForWin();
}

function combineColumn() {
    for (let i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML && squares[i].innerHTML !== "") {
            let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
            squares[i].innerHTML = combinedTotal;
            squares[i + width].innerHTML = "";
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
    }
    checkForWin();
}

function control(e) {
    if (e.keyCode === 39) keyRight();
    else if (e.keyCode === 37) keyLeft();
    else if (e.keyCode === 38) keyUp();
    else if (e.keyCode === 40) keyDown();
}
document.addEventListener('keyup', control);

function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
}

function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
}

function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
}

function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
}

function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 1024) {
            alert('You Win!');
            document.removeEventListener('keyup', control);
        }
    }
}

function checkForGameOver() {
    let zeros = squares.filter(s => s.innerHTML === "").length;
    if (zeros === 0) {
        alert('Game Over');
        document.removeEventListener('keyup', control);
    }
}

function updateStyles() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].className = 'cell';
        if (squares[i].innerHTML !== "") {
            squares[i].classList.add('tile-' + squares[i].innerHTML);
        }
    }
}

createBoard();
