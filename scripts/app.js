function init (){
//testing
console.log('testing')
const grid = document.querySelector('.grid')
const width = 50 // width of our grid (number of cells in a row)
const height = 50 // height of our grid (number of cells in a column)
const cellCount = width * height
const cells = []
//positioning Froggo
const startingPosition = 2427
let currentPosition = startingPosition

function createGrid(){
  for(let i = 0; i < cellCount; i++){
    const cell = document.createElement('div')
    cell.dataset.index = i
    if (i===76){
      cell.classList.add('goal')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }

  addFrog(startingPosition)
}
createGrid()
console.log(grid)
//styling grid sections
/*function createRiver(){
  for(150<i<1050){
    grid[i].style.color = 'blue'
  }
  function createRiver()
}
function create wall
*/
//document.getElementById('380').style.backgroundColor = 'grey'


function addFrog(position){
  cells[position].classList.add('frog')
}

function removeFrog(position){
  cells[position].classList.remove('frog')
}

function handleMovement(event){
  const key = event.keyCode
  const up = 38
  const down = 40
  const left = 37
  const right = 39
  removeFrog(currentPosition)

  if(key === right && currentPosition % width !== width - 1){
    console.log('RIGHT')
    currentPosition++
  } else if (key === left && currentPosition % width !== 0){
    console.log('LEFT')
    currentPosition--
  } else if (key === up && currentPosition >= width){
    console.log('UP')
    currentPosition -= width
  } else if (key === down && currentPosition < cellCount - width ){
    console.log('DOWN')
    currentPosition += width
  }

  console.log('remainder from currentPosition % width', currentPosition % width)

  addFrog(currentPosition)
}
document.addEventListener('keydown', handleMovement)



}

window.addEventListener('DOMContentLoaded', init)

//
  //countdown timer
  //const timeLeft = document.getElementById('timeLeft');
  //const timer

  //function changeTime() {
    //timeLeft = timeLeft - 1;
    //}
  

  //function start() {
    //timer = setInterval(changeTime, 1000);



//!function to start the game
//start game triggers the timer, and sets 
//function startGame(event){
  //startTimer()
//}


  //listen for click

  //const button = document.querySelectorAll('button')

  //button.addEventListener('click', startGame)
    





//? Elements
//grid cells will be added here.
/*use
  function createGrid(){
  grid.appendChild(cell)
*/
//add formatting to cells using javascript DOM styling

//!moving threats
//How do I select cells with index numbers in a given range through the dom and apply formatting to them? or do I need to hard code classes? can I store them in a constant and apply 
//formatting to that whole section ina  way that alternates with time? add class and let it linger for one second and then move on to the next cell
//make these by setting styling on the cells in the rows which are lanes to change - to take on a class with
//the colours , and removing it to leave the road formatting as vehicles pass
//of the vehicles. this will run set to timers, set intervals, different speeds in different lanes.
// could add a gif as well? and have it as a shifting background class
//at the edge of the grid, need to show vehicle passing
//frogs will also be CSS - background gifs
//frog will be an ID to take priority over any other properties.? or use !important in css to override?

//const current score
//const lives left
//need to keep track of index where frog is too, and listen for this to equal where a threat is. if they 
//are the same, lose a life.

//? Variables
//Score
//Lives

//?Executions

//lose 1 life = resets timer and lets you start again with one less life
//lose 3 lives = end game
//level up function that will reset everything and speed the game up but save the score 

//! Movement
//key down - document.addEventListener('keydown', handleMovement)
//function to add and remove frog background gif and to increase index this by one (or 10) on keydown in all directions
//
//collision: if a frog is on same square as any of the moving objects - lose a life and reset. 
//frog on log or moving object - moves frog along at same speed 
//frog in the water - if on a cell with blue background class, frog dies and lose life

//?Events

//const button = document.querySelectorAll('button')

//button.addEventListener('click', changeTime())

//on button click - start game - starts the timer counting down from 60.
//              - starts the moving threats which are set to timers by class.

//on clock hitting zero end game game over listens for clock to hit zero and there being <4 frogs in the dock
// you win - listens for clock >0 and 4 frogs at lillypad location

//score increase - at the wall, gain 100 points, at the dock, gain 300 points. 
//!how to stop from increasing score by going back and forth? - on reaching wall, give it a class that triggers 
//! the score increase, and don't remove it. have a clause that looks for the class and only
//! adds to points if that class isnt there


//frog in lilypad - score increase and key down now controls the second frog
//!game also ends




