function init (){
//!Elements
const grid = document.querySelector('.grid')
const timer = document.getElementById('timeLeft')
const goal = document.querySelector('.goal')
const score = document.getElementById('scoreNumber')
const button = document.querySelector('button')
const livesLeft = document.querySelector('#livesLeft')

//!Variables

//? Grid setup
const width = 50 // width of our grid (number of cells in a row)
const height = 50 // height of our grid (number of cells in a column)
const cellCount = width * height
const cells = []
let timerInterval  
let busInterval

//?Positions
//positioning Froggo
const startingPosition = 2427

let currentPosition = startingPosition
//let busLane1 =  [2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099 ]
//let busLane2 = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049]
let busPositions = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049]
let tramPositions = [1750, 1751, 1752, 1753, 1754, 1755, 1756, 1762, 1763, 1764, 1765, 1766, 1767, 1773, 1774, 1775, 1776, 1777, 1778, 1784, 1785, 1786, 1787, 1788, 1789, 1795, 1796, 1797, 1798, 1799]
let gatorPositions = [878, 978, 856, 901, 902, 903, 904, 905, 906, 907, 923, 924, 925, 926, 927, 928, 929, 943, 944, 945, 946, 947, 948, 949, 956]
let sharkPositions = [559, 602, 606, 607, 608, 609, 610, 661, 660, 659, 658, 657, 656, 655, 654, 653, 702, 706, 707, 708, 709, 710, 759]
let lobsterPositions = [302, 303, 333, 334, 254, 285, 385, 354, 417, 418, 469, 369]
//!On page load

function createGrid(){
  for(let i = 0; i < cellCount; i++){
    const cell = document.createElement('div')
    cell.dataset.index = i
    if(busPositions.includes(i)){
      cell.classList.add('bus')
    }
    if(tramPositions.includes(i)){
      cell.classList.add('tram')
    }
    if(gatorPositions.includes(i)){
      cell.classList.add('gator')
    }
    if(sharkPositions.includes(i)){
      cell.classList.add('shark')
    }
    if(lobsterPositions.includes(i)){
      cell.classList.add('lobster')
    }
    if (i===76){
      cell.classList.add('goal')
    }
    if (i<1250 && i>=150){
      cell.classList.add('blue')
    }
    if (i<1450 && i>=1250){
      cell.classList.add('wall')
    }
    if (i<2350 && i>=1450){
      cell.classList.add('road')
    }
    if (i<2499 && i>2450){
      cell.classList.add('fire')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }

  addFrog(startingPosition)
}
createGrid()

//!Executions/functions

function startGame(){
  timerInterval = setInterval(updateTime,1000)
  moveObstacles()
}

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
    currentPosition++
  } else if (key === left && currentPosition % width !== 0){
    currentPosition--
  } else if (key === up && currentPosition >= width){
    currentPosition -= width
  } else if (key === down && currentPosition < cellCount - width ){
    currentPosition += width
  }

  addFrog(currentPosition) 


  function frogCollisions(){
    if ((cells[currentPosition].classList.contains('goal')) && (parseInt(timer.innerHTML) > 0)){
      winGame()
    }
    if (!(cells[currentPosition].classList.contains('goal')) && (parseInt(timer.innerHTML) === 0)){
      loseLife()
    }
    else if (cells[currentPosition].classList.contains('bus')){
      loseLife()
      console.log('lost a life!')
    }
    else if (cells[currentPosition].classList.contains('tram')){
      loseLife()
      console.log('killed by a tram!')
    }
    else if (cells[currentPosition].classList.contains('gator')){
      loseLife()
      console.log('killed by gators!')
    }
    else if (cells[currentPosition].classList.contains('lobster')){
      loseLife()
      console.log('killed by a lobster!')
    }
    else if (cells[currentPosition].classList.contains('shark')){
      loseLife()
      console.log('mauled by a shark!')
    }
    else if (!(cells[currentPosition].classList.contains('goal')) && timer.innerHTML === 0){
      loseLife()
      
    }
  }
  frogCollisions()

}

function gameOver(){
  removeFrog(currentPosition)
  alert('     ☠️🐸   ---   FROGGER   ---   🐸☠️' + '\n' + '         You lose!' + '\n' + '        GAME OVER' + '\n' + 'Click OK to reset and try again!')
  score.innerHTML = 0 
  currentPosition = startingPosition
  timer.innerHTML = 21
  livesLeft.innerHTML = parseInt(livesLeft.innerHTML) + 4
}

function loseLife(){
  if (parseInt(livesLeft.innerHTML) === 0){
    gameOver()
  }
  else 
  removeFrog(currentPosition)
  score.innerHTML = 0 
  currentPosition = startingPosition
  timer.innerHTML = 21
  livesLeft.innerHTML = livesLeft.innerHTML - 1
  alert('  ☠️🐸   ---   FROGGER   ---   🐸☠️' + '\n' + '     You lost a life!' + '\n' + '\n' + '      Click OK to try again!')
}

function winGame(){
    score.innerHTML =  parseInt(score.innerHTML) + 500
    alert('     ✨🐸   ---   FROGGER   ---   🐸✨' + '\n' + '     You got Froggo home!' + '\n' + '      SCORE: ' + score.innerHTML + '\n' + 'Click OK to play again and save another Frog from their burning habitat!')
    removeFrog(currentPosition)
    score.innerHTML = 0 
    currentPosition = startingPosition
    timer.innerHTML = 21
    livesLeft.innerHTML = 3  
  }

function updateTime(){
  if (timer.innerHTML>0){
    timer.innerHTML= timer.innerHTML-1
  }
}

function moveObstacles(){
  moveBus()
  moveTram()
  moveGators()
  moveSharks()
  moveLobsters()
  //add in any other moving obstacles here :D
}

function moveBus(){
  busInterval = setInterval(() => {
    //remove bus class
    busPositions.forEach(position => {
      cells[position].classList.remove('bus')
    })

    busPositions.forEach((position, index) => {
      if(position % width !== width - 1){
        busPositions[index]++
      } else{
        busPositions[index] = busPositions[index] - width + 1
      }
    })

    //add bus class
    busPositions.forEach(position => {
      cells[position].classList.add('bus')
    })

    //checking if bus hits froggo
    busPositions.forEach(position => {
      if (cells[position].classList.contains('frog')){
        loseLife()
      }
    })
  } , 300 )
}

  function moveTram(){
    tramInterval = setInterval(() => {
      //remove tram class
    tramPositions.forEach(position => {
      cells[position].classList.remove('tram')
    }) 

    //update position to where it's moving to
    tramPositions.forEach((position, index) => {
      if(position % width != width - 1){
        tramPositions[index]++
      } else{
        tramPositions[index] = tramPositions[index] - width + 1
      }
    })
    //add tram class
    tramPositions.forEach(position => {
      cells[position].classList.add('tram')
    })
    //checking if tram hits froggo
    tramPositions.forEach(position => {
      if (cells[position].classList.contains('frog')){
        loseLife()
      }
    })
    } , 200)
  }

  function moveGators(){
    gatorInterval = setInterval(() => {
    //remove gator class
    gatorPositions.forEach(position => {
      cells[position].classList.remove('gator')
    }) 
  
    //update position to where it's moving to
    gatorPositions.forEach((position, index) => {
      if(position % width != width - 1){
        gatorPositions[index]++
        } else{
          gatorPositions[index] = gatorPositions[index] - width + 1
        }
      })
      //add gator class
      gatorPositions.forEach(position => {
        cells[position].classList.add('gator')
      })
      //checking if gator hits froggo
    gatorPositions.forEach(position => {
      if (cells[position].classList.contains('frog')){
        loseLife()
      }
    })
      } , 100)
    }
  function moveSharks(){
    sharkInterval = setInterval(() => {
    //remove shark class
    sharkPositions.forEach(position => {
      cells[position].classList.remove('shark')
    }) 
  
    //update position to where it's moving to
    sharkPositions.forEach((position, index) => {
      if(position % width != width - 1){
        sharkPositions[index]++
        } else{
          sharkPositions[index] = sharkPositions[index] - width + 1
        }
      })
      //add shark class
      sharkPositions.forEach(position => {
        cells[position].classList.add('shark')
      })
      //checking if shark hits froggo
    sharkPositions.forEach(position => {
      if (cells[position].classList.contains('frog')){
        loseLife()
      }
    })
      } , 50)
    }

  function moveLobsters(){
    lobsterInterval = setInterval(() => {
    //remove lobster class
    lobsterPositions.forEach(position => {
      cells[position].classList.remove('lobster')
    }) 
  
    //update position to where it's moving to
    lobsterPositions.forEach((position, index) => {
      if(position % width != width - 1){
        lobsterPositions[index]++
        } else{
          lobsterPositions[index] = lobsterPositions[index] - width + 1
        }
      })
      //add lobster class
      lobsterPositions.forEach(position => {
        cells[position].classList.add('lobster')
      })
      //checking if lobster hits froggo
    lobsterPositions.forEach(position => {
      if (cells[position].classList.contains('frog')){
        loseLife()
      }
    })
      } , 70)
}

//!Events
document.addEventListener('keydown', handleMovement)
button.addEventListener('click', startGame)
}

window.addEventListener('DOMContentLoaded', init)




