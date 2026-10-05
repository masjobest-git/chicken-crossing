/*-------------------------------- PSEUDO CODE --------------------------------*/
/*
- Select all squeres on the board;
- Message 
- Control buttons
- Resset button
- Set Position of the chicken
- Set Position of the first patrol car
- Set Position of the secound patrol car
- Colision checking
- Stop movement if game is over
- Create functions that will allow chicken to move (user moving)
- Create functions that will allow patrol cars to move (computer moving) 
- Function that will check if patrol cars have hit the chicken
- Function that will triger Reset button that will reset the game
- Functions that will allow player to use arrows on keyboard
*/

/*-------------------------------- Constants --------------------------------*/

//All squares on the board

const squares = document.querySelectorAll('.square');

//Message

const messageElement = document.querySelector('#message');

// Control buttons

const upButton = document.querySelector('#up');
const downButton = document.querySelector('#down');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');

//Reset button

const resetButton = document.querySelector('#reset');

/*-------------------------------- Variables --------------------------------*/

//Chicken starts at the bottom right corner

let chickenPosition = 24;

//Patrol car 1

let car1Position = 15;
let car1Direction = 1;

//Patrol car 2

let car2Position = 9;
let car2Direction = -1;

//Game status

let gameOver = false;

/*-------------------------------- Functions --------------------------------*/

function renderBoard() {

  // Clear board

    squares.forEach((square) => {
    square.textContent = '';
    });

    squares[chickenPosition].textContent = '🐔';

    squares[car1Position].textContent = '🚗';

    squares[car2Position].textContent = '🚗';
}

/*----------------------------- Move Chicken -----------------------------*/

function moveChicken (direction) {
    if (gameOver) return;

    if (direction === 'up') {
        console.log('UP', chickenPosition);
        if (chickenPosition >= 5) {
        chickenPosition -= 5;
        }
    }
    if (direction === 'down') {
        console.log('DOWN', chickenPosition);
        if (chickenPosition <= 19) {
        chickenPosition += 5;
        }
    }
    if (direction === 'left') {
        console.log('LEFT', chickenPosition % 5);
        if (chickenPosition % 5 !== 0) {
            chickenPosition -= 1;
        }
    }
    if (direction === 'right') {
        console.log('RIGHT', chickenPosition % 5);
        if (chickenPosition % 5 !== 4) {
            chickenPosition += 1;
        }
    checkGame ();
    renderBoard();
    }
}

/*----------------------------- Move Cars -----------------------------*/

function moveCars() {

    if (gameOver) return;

// First patrol CAR

    car1Position += car1Direction;

    if (car1Position >= 19) {
    car1Direction = -1;
    }

    if (car1Position <= 15) {
    car1Direction = 1;
    }

// Secound patrol CAR

    car2Position += car2Direction;

    if (car2Position >= 9) {
    car2Direction = -1;
    }

    if (car2Position <= 5) {
    car2Direction = 1;
    }

checkGame();

renderBoard();
}

/*----------------------------- Check the GAME -----------------------------*/

function checkGame() {

    if (
    chickenPosition === car1Position || chickenPosition === car2Position) {

    gameOver = true;

    messageElement.textContent = '💥 GAME OVER! The chicken got hit!';

    return;
    }

    if (chickenPosition <= 4) {

    gameOver = true;

    messageElement.textContent = '🎉 YOU WIN! The chicken crossed the road!';
    }
}

/*----------------------------- Reset the GAME -----------------------------*/

function resetGame() {
    chickenPosition = 24;

    car1Position = 15;
    car2Direction = 1;

    car2Position = 9;
    car2Direction = -1;

    cars = [car1Position, car2Position];

    gameOver = false;

    messageElement.textContent = 'Help the chicken cross the road!';
    
    renderBoard();
}

/*----------------------------- Event Listeners -----------------------------*/

// Chicken movement buttons

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

//Resset BUTTON

resetButton.addEventListener('click', resetGame);


/*----------------------------- Automatic Cars ------------------------------*/

// Cars move every 700 milliseconds

setInterval(function () {

    moveCars();

}, 700);

/*-------------------------------- Start GAME ------------------------------------*/

    renderBoard();