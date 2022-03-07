const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
// Look for all divs in .grid class
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let timerId
let movementId
let currentIdx = 76
let currentTime = 9
let outcomeTimerId
const width = 9

function moveFrog(e) {
    // Show all event (e) attributes
    // console.log(e)
    squares[currentIdx].classList.remove('frog')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentIdx % width !== 0) currentIdx -= 1
            break
        case 'ArrowRight':
            if (currentIdx % width !== width - 1) currentIdx += 1
            break
        case 'ArrowUp':
            if (currentIdx >= width) currentIdx -= width
            break
        case 'ArrowDown':
            if (currentIdx < squares.length - width) currentIdx += width
            break
    }
    squares[currentIdx].classList.add('frog')
}

function timer(){
    currentTime--
    timeLeftDisplay.textContent = currentTime + 1
}

function autoMoveElements() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
    // lose()
}

function moveLogLeft(logLeft) {
    switch(true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight) {
    switch(true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

function moveCarLeft(carLeft) {
    switch(true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight) {
    switch(true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function checkOutcomes() {
    lose()
    win()
}

function lose() {
    if (
        squares[currentIdx].classList.contains('c1') || 
        squares[currentIdx].classList.contains('l4') || 
        squares[currentIdx].classList.contains('l5') ||
        currentTime <= 0
    ) {
        squares[currentIdx].classList.remove('frog')
        stopActions('You lose')
    }
}

function win() {
    if (squares[currentIdx].classList.contains('ending-block')){
        stopActions('You win.')    
    }
}

function stopActions(message){
    timeLeftDisplay.textContent = 0
    resultDisplay.textContent = message
    clearInterval(outcomeTimerId)
    clearInterval(timerId)
    clearInterval(movementId)
    document.removeEventListener('keyup', moveFrog)
}

startPauseButton.addEventListener('click', () => {
    if (timerId){
        clearInterval(timerId)
        clearInterval(movementId)
        clearInterval(outcomeTimerId)
        timerId = null
        outcomeTimerId = null
        movementId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        document.addEventListener('keyup', moveFrog)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        movementId = setInterval(autoMoveElements, 1000)
        timerId = setInterval(timer, 1000)
    }
})
