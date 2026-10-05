/*--------------------------PSEUDO CODE--------------------*/
/*
- Select all squeres on the board;
- Message 
- Control buttons
- Resset buton
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

let car1Position = 21;
let car1Direction = -5;

//Patrol car 2

let car2Position = 3;
let car2Direction = 5;

// Array for collision checking

let cars = [car1Position, car2Position];

//Game status

let gameOver = false;


/*-------------------------------- Functions --------------------------------*/



/*----------------------------- Event Listeners -----------------------------*/