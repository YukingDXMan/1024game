const gridDisplay = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const width = 4;
let squares = [];
let score = 0;

let touchStartX = 0;
let touchStartY = 0;

function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.classList.add('cell');
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
    let moved = false;
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let row = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i + 1].innerHTML) || 0,
                parseInt(squares[i + 2].innerHTML) || 0,
                parseInt(squares[i + 3].innerHTML) || 0
            ];
            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let newRow = Array(missing).fill('').concat(filteredRow);
            
            if (JSON.stringify(row) !== JSON.stringify(newRow.map(v => v === '' ? 0 : v))) moved = true;

            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
        }
    }
    return moved;
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let row = [
                parseInt(squares[i].innerHTML) || 0,
                parseInt(squares[i + 1].innerHTML) || 0,
                parseInt(squares[i + 2].innerHTML) || 0,
                parseInt(squares[i + 3].innerHTML) || 0
            ];
            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            let newRow = filteredRow.concat(Array(missing).fill(''));

            if (JSON.stringify(row) !== JSON.stringify(newRow.map(v => v === '' ? 0 : v))) moved = true;

            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
        }
    }
    return moved;
}

function moveDown() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let column = [
            parseInt(squares[i].innerHTML) || 0,
            parseInt(squares[i + width].innerHTML) || 0,
            parseInt(squares[i + width * 2].innerHTML) || 0,
            parseInt(squares[i + width * 3].innerHTML) || 0
        ];
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let newColumn = Array(missing).fill('').concat(filteredColumn);

        if (JSON.stringify(column) !== JSON.stringify(newColumn.map(v => v === '' ? 0 : v))) moved = true;

        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
    }
    return moved;
}

function moveUp() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let column = [
            parseInt(squares[i].innerHTML) || 0,
            parseInt(squares[i + width].innerHTML) || 0,
            parseInt(squares[i + width * 2].innerHTML) || 0,
            parseInt(squares[i + width * 3].innerHTML) || 0
        ];
        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let newColumn = filteredColumn.concat(Array(missing).fill(''));

        if (JSON.stringify(column) !== JSON.stringify(newColumn.map(v => v === '' ? 0 : v))) moved = true;

        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
    }
    return moved;
}

function combineRow() {
    for (let i = 0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== "" && (i + 1) % 4 !== 0) {
            let combinedTotal = parseInt(squares[i].innerHTML) * 2;
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
            let combinedTotal = parseInt(squares[i].innerHTML) * 2;
            squares[i].innerHTML = combinedTotal;
            squares[i + width].innerHTML = "";
            score += combinedTotal;
            scoreDisplay.innerHTML = score;
        }
    }
    checkForWin();
}

function actionRight() { moveRight(); combineRow(); moveRight(); generate(); }
function actionLeft() { moveLeft(); combineRow(); moveLeft(); generate(); }
function actionDown() { moveDown(); combineColumn(); moveDown(); generate(); }
function actionUp() { moveUp(); combineColumn(); moveUp(); generate(); }

function control(e) {
    if (e.keyCode === 39) actionRight();
    else if (e.keyCode === 37) actionLeft();
    else if (e.keyCode === 38) actionUp();
    else if (e.keyCode === 40) actionDown();
}

document.addEventListener('keyup', control);

document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, {passive: false});

document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const threshold = 30;

    if (absX > threshold || absY > threshold) {
        if (absX > absY) {
            if (dx > 0) actionRight();
            else actionLeft();
        } else {
            if (dy > 0) actionDown();
            else actionUp();
        }
    }
}, {passive: false});

function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 1024) {
            alert('Congratulations! 1024 Clear!');
        }
    }
}

function checkForGameOver() {
    let zeros = squares.filter(s => s.innerHTML === "").length;
    if (zeros === 0) {
        alert('Game Over! Try again?');
    }
}

function updateStyles() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].className = 'cell';
        let val = squares[i].innerHTML;
        if (val !== "") {
            squares[i].classList.add('tile-' + val);
        }
    }
}

createBoard();
