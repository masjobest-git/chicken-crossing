
const squares = document.querySelectorAll('.square');

const messageElement = document.querySelector('#message');

const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');

const resetButton = document.querySelector('#reset');

const nextLevelButton = document.querySelector('#nextLevel');

const playButton = document.querySelector('#playButton');

const introScreen = document.querySelector('#introScreen');

let chickenPosition = 24;

let car1Position = 15;
let car1Direction = 1;

let car2Position = 9;
let car2Direction = -1;

let gameOver = false;

let level = 1;

let minePosition = 12;

let lorryPosition = 20;
let lorryDirection = -1;

let carTimer;

let lorryTimer;

function renderBoard() {

    squares.forEach((square) => {
        square.textContent = '';
    });

    squares[chickenPosition].textContent = '🐔';

    squares[car1Position].textContent = '🚗';
    squares[car2Position].textContent = '🚗';

    if (level === 2) {

    squares[minePosition].textContent = '💣';

    squares[lorryPosition].textContent = '🚚';
    }
}

function moveChicken(direction) {

    if (gameOver) return;

    if (direction === 'up') {

        if (chickenPosition >= 5) {
            chickenPosition -= 5;
        }
    }

    if (direction === 'down') {

        if (chickenPosition <= 19) {
            chickenPosition += 5;
        }
    }

    if (direction === 'left') {

        if (chickenPosition % 5 !== 0) {
            chickenPosition -= 1;
        }
    }

    if (direction === 'right') {
        
        if (chickenPosition % 5 !== 4) {
            chickenPosition += 1;
        }
    }

    checkGame();
    renderBoard();
}

function moveCars() {

    if (gameOver) return;

    car1Position += car1Direction;

    if (car1Position === 19) {
        car1Direction = -1;
    }

    if (car1Position === 15) {
        car1Direction = 1;
    }

    car2Position += car2Direction;

    if (car2Position === 5) {
        car2Direction = 1;
    }

    if (car2Position === 9) {
        car2Direction = -1;
    }

    checkGame();
    renderBoard();
}

    function moveLorry() {

    if (gameOver || level !== 2) return;

    lorryPosition += lorryDirection *5;

    if (lorryPosition === 5) {
        lorryDirection = 1;
    }

    if (lorryPosition === 20) {
        lorryDirection = -1;
    }

    checkGame();
    renderBoard();
}

function checkGame() {

    if (
        chickenPosition === car1Position ||
        chickenPosition === car2Position
    ) {

        gameOver = true;

        clearInterval(carTimer);

        messageElement.textContent =
            '💥 GAME OVER! The chicken got hit!';

        return;
    }

    if (level === 2 && chickenPosition === minePosition) {

        gameOver = true;

        clearInterval(carTimer);

        messageElement.textContent =
            '💣 BOOM! The chicken stepped on a mine!';

        return;
    }

    if (level === 2 && chickenPosition === lorryPosition) {

        gameOver = true;

        clearInterval(carTimer);
        clearInterval(lorryTimer);

        messageElement.textContent =
            '🚚 CRASH! The chicken got hit by the lorry!';

        return;
    }

    if (chickenPosition <= 4) {

        gameOver = true;

        clearInterval(carTimer);

        if (level === 1) {

            messageElement.textContent =
                '🎉 YOU PASSED! First level completed!';

            nextLevelButton.hidden = false;
        }

        else {

            messageElement.textContent =
                '🎉 YOU WIN! The chicken crossed the road!';
        }
    }
}

function nextLevel() {

    level = 2;

    chickenPosition = 24;

    car1Position = 15;
    car1Direction = 1;

    car2Position = 9;
    car2Direction = -1;

    minePosition = 12;

    lorryPosition = 20;
    lorryDirection = -1;

    gameOver = false;

    nextLevelButton.hidden = true;

    messageElement.textContent =
        'LEVEL 2! Watch out for the mine and lorry!';

    renderBoard();
    clearInterval(carTimer);
    clearInterval(lorryTimer);

    carTimer = setInterval(function () {
        moveCars();
    }, 400);

    lorryTimer = setInterval(function () {
        moveLorry();
    }, 800);
}

function resetGame() {

    clearInterval(carTimer);
    clearInterval(lorryTimer);
    level = 1;

    chickenPosition = 24;

    car1Position = 15;
    car1Direction = 1;

    car2Position = 9;
    car2Direction = -1;

    minePosition = 12;

    lorryPosition = 20;
    lorryDirection = -1;

    gameOver = false;

    nextLevelButton.hidden = true;

    messageElement.textContent ='Help the chicken cross the road!';

    renderBoard();

    carTimer = setInterval(function () {
        moveCars();
    }, 700);
}

upButton.addEventListener('click', function () {
    moveChicken('up');
});

downButton.addEventListener('click', function () {
    moveChicken('down');
});

leftButton.addEventListener('click', function () {
    moveChicken('left');
});

rightButton.addEventListener('click', function () {
    moveChicken('right');
});

resetButton.addEventListener('click', resetGame);

nextLevelButton.addEventListener('click', nextLevel);

playButton.addEventListener('click', function () {

    introScreen.style.display = 'none';

});

document.addEventListener('keydown', function (event) {

    if (event.key === 'ArrowUp') {
    moveChicken('up');
    }

    if (event.key === 'ArrowDown') {
    moveChicken('down');
    }

    if (event.key === 'ArrowLeft') {
    moveChicken('left');
    }

    if (event.key === 'ArrowRight') {
    moveChicken('right');
    }
});

carTimer = setInterval(function () {
    moveCars();
}, 700);

renderBoard();