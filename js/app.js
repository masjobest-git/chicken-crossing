/*-------------------------------- PSEUDO CODE --------------------------------*/
/*
- Select all squares on the board;
- Message 
- Control buttons
- Reset button
- Set Position of the chicken
- Set Position of the first patrol car
- Set Position of the second patrol car
- Collision checking
- Stop movement if game is over
- Create functions that will allow chicken to move
- Create functions that will allow patrol cars to move
- Function that will check if patrol cars have hit the chicken
- Function that will trigger Reset button
- Functions that will allow player to use arrows on keyboard
*/

/*-------------------------------- Constants --------------------------------*/

// All squares on the board
const squares = document.querySelectorAll('.square');

// Message
const messageElement = document.querySelector('#message');

// Control buttons
const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');

// Reset button
const resetButton = document.querySelector('#reset');

// Next level button
const nextLevelButton = document.querySelector('#nextLevel');

/*-------------------------------- Variables --------------------------------*/

// Chicken starts at the bottom right corner
let chickenPosition = 24;

// Patrol car 1
let car1Position = 15;
let car1Direction = 1;

// Patrol car 2
let car2Position = 9;
let car2Direction = -1;

// Game status
let gameOver = false;

// Level
let level = 1;

// Car timer
let carTimer;

/*-------------------------------- Functions --------------------------------*/

function renderBoard() {

// Clear board
    squares.forEach((square) => {
        square.textContent = '';
    });

    // Chicken
    squares[chickenPosition].textContent = '🐔';

    // Cars
    squares[car1Position].textContent = '🚗';
    squares[car2Position].textContent = '🚗';
}

/*----------------------------- Move Chicken -----------------------------*/

function moveChicken(direction) {

// Don't move if game is over

    if (gameOver) return;

    // UP
    if (direction === 'up') {

        console.log('UP', chickenPosition);

        if (chickenPosition >= 5) {
            chickenPosition -= 5;
        }
    }

// DOWN

    if (direction === 'down') {

        console.log('DOWN', chickenPosition);

        if (chickenPosition <= 19) {
            chickenPosition += 5;
        }
    }

    // LEFT
    if (direction === 'left') {

        console.log('LEFT', chickenPosition % 5);

        if (chickenPosition % 5 !== 0) {
            chickenPosition -= 1;
        }
    }

    // RIGHT
    if (direction === 'right') {

        console.log('RIGHT', chickenPosition % 5);

        if (chickenPosition % 5 !== 4) {
            chickenPosition += 1;
        }
    }

// Check collision / win

    checkGame();

// Update board

    renderBoard();
}

/*----------------------------- Move Cars -----------------------------*/

function moveCars() {

// Don't move if game is over

    if (gameOver) return;

/*---------------- FIRST CAR ----------------*/

    car1Position += car1Direction;

    if (car1Position === 19) {
        car1Direction = -1;
    }

    if (car1Position === 15) {
        car1Direction = 1;
    }

/*---------------- SECOND CAR ----------------*/

    car2Position += car2Direction;

    if (car2Position === 5) {
        car2Direction = 1;
    }

    if (car2Position === 9) {
        car2Direction = -1;
    }

// Check collision

    checkGame();

    // Update board
    renderBoard();
}

/*----------------------------- Check the GAME -----------------------------*/

function checkGame() {

/*---------------- COLLISION ----------------*/

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

/*---------------- WIN ----------------*/

    if (chickenPosition <= 4) {

        gameOver = true;

        clearInterval(carTimer);


        // LEVEL 1
        if (level === 1) {

            messageElement.textContent =
                '🎉 YOU PASSED! First level completed!';

            nextLevelButton.hidden = false;
        }

        // LEVEL 2
        else {

            messageElement.textContent =
                '🎉 YOU WIN! The chicken crossed the road!';
        }
    }
}

/*----------------------------- NEXT LEVEL -----------------------------*/

function nextLevel() {

    level = 2;

// Reset chicken
    chickenPosition = 24;

// Reset cars
    car1Position = 15;
    car1Direction = 1;

    car2Position = 9;
    car2Direction = -1;

// Game active
    gameOver = false;

// Hide button
    nextLevelButton.hidden = true;

// Message
    messageElement.textContent =
        'LEVEL 2! Cars are faster!';

// Show starting positions
    renderBoard();

// LEVEL 2 - faster cars
    carTimer = setInterval(function () {
        moveCars();
    }, 400);
}

/*----------------------------- RESET GAME -----------------------------*/

function resetGame() {

// Stop current timer
    clearInterval(carTimer);

// Back to level 1
    level = 1;

// Reset chicken
    chickenPosition = 24;

// Reset cars
    car1Position = 15;
    car1Direction = 1;

    car2Position = 9;
    car2Direction = -1;

// Game active
    gameOver = false;

// Hide next level button
    nextLevelButton.hidden = true;

// Message
    messageElement.textContent =
        'Help the chicken cross the road!';

// Draw board
    renderBoard();

// Start cars again
    carTimer = setInterval(function () {
        moveCars();
    }, 700);
}

/*----------------------------- EVENT LISTENERS -----------------------------*/

// UP
upButton.addEventListener('click', function () {
    moveChicken('up');
});

// DOWN
downButton.addEventListener('click', function () {
    moveChicken('down');
});

// LEFT
leftButton.addEventListener('click', function () {
    moveChicken('left');
});

// RIGHT
rightButton.addEventListener('click', function () {
    moveChicken('right');
});

// RESET
resetButton.addEventListener('click', resetGame);

// NEXT LEVEL
nextLevelButton.addEventListener('click', nextLevel);

/*----------------------------- AUTOMATIC CARS -----------------------------*/

// Level 1 cars move every 700 milliseconds

carTimer = setInterval(function () {
    moveCars();
}, 700);

/*----------------------------- START GAME -----------------------------*/

renderBoard();