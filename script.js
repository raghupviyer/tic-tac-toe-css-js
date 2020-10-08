let oTurn
const x_class = 'x'
const o_class = 'o'

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const black_screen = document.getElementById('winning-message');
const restart = document.querySelector('button');

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once:true});
});

restart.addEventListener('click', startGame);

function startGame() {
    black_screen.classList.remove('show');
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
    });

}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? o_class : x_class

    //placemark

    placeMark(cell, currentClass)

    //check win

    if (checkWin(currentClass)) {
        endgame(false)
    }

    //check draw

    else if (checkDraw()) {
        endgame(true)
    }
        
    //switch turn
        
    else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn
    board.classList.remove(o_class)
    board.classList.remove(x_class)
    if (oTurn) {
        board.classList.add(o_class)
    }
    else {
        board.classList.add(x_class)
    }
}

function checkWin(currentClass) {
    return winning_combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endgame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O" : "X"} WON!`
    }
    black_screen.classList.add('show');
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}