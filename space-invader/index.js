const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
const powerLvlDisplay = document.querySelector('#power-level')

let boardWidth = 15
let boardHeight = 15
let direction = 1
let score = 0
let currentShooterIdx = (boardHeight * boardWidth) - (Math.ceil(boardWidth / 2) + boardWidth)
let rows = Math.floor(boardWidth / 15) * 3
let col = Math.floor(boardWidth * 2 / 3)
let difficulty = [
    Math.ceil(boardHeight * 1 / 4),
    Math.ceil(boardHeight / 2),
    Math.ceil(boardHeight * 3 / 4)
]
console.log(difficulty)
let invaderPosition = 0
let lastShot = 0
let shootingSpeed = 500
let invaderSpeed = 500
let aliensRemoved = []
let alienInvaders = []
let powerUps = []
let invadersId
let totalPowerUps = 4
let powerLvl = 1

// Set up the board width and height
grid.style.width = boardWidth * 20 + 'px'
grid.style.height = boardHeight * 20 + 'px'

// Create the grid
for (let i = 0; i < boardWidth * boardHeight; i++) {
    const square = document.createElement('div')
    square.setAttribute('id', i)
    grid.appendChild(square)
}
const squares = Array.from(document.querySelectorAll('.grid div'))

// Set up the invader's locations
for (let i = 0; i < rows; i++){
    for(let j = 0; j < col; j++){
        alienInvaders.push(j + invaderPosition)
    }
    invaderPosition += boardWidth
}

// Randomize power-up locations
for (let i = 0; i < totalPowerUps; i++){
    let powerUpIdx = Math.floor(Math.random() * alienInvaders.length)
    if(!powerUps.includes(powerUpIdx))
        powerUps.push(powerUpIdx)
    else
        i--
}

// Draw the invaders on the board
function drawInvaders() {
    for(let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
            if (powerUps.includes(i))
                squares[alienInvaders[i]].classList.add('power-up')
        }
    }
}

drawInvaders()

// Remove the invaders & power-ups
function removeInvaders() {
    for(let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
        squares[alienInvaders[i]].classList.remove('power-up')
    }
}

squares[currentShooterIdx].classList.add('shooter')

// Move the shooter
function moveShooter(e) {
    squares[currentShooterIdx].classList.remove('shooter')
    squares[currentShooterIdx].classList.remove('power-up')

    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIdx % boardWidth !== 0)
                currentShooterIdx -= 1
            break
        case 'ArrowRight':
            if (currentShooterIdx % boardWidth !== boardWidth -1)
                currentShooterIdx += 1
            break
    }
    
    squares[currentShooterIdx].classList.add('shooter')

    // If shooter collides with the invaders, GAME OVER
    if (squares[currentShooterIdx].classList.contains('invader', 'shooter')) {
        resultDisplay.innerHTML = 'GAME OVER!<br />Finally score: ' + score
        clearInterval(invadersId)
        document.removeEventListener('keydown', shootInvaders)
        document.removeEventListener('keydown', moveShooter)
        squares[currentShooterIdx].classList.add('boom')
    }
}

// Move the invaders left, right and down
function moveInvaders() {
    const leftEdge = alienInvaders[0] % boardWidth === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % boardWidth === boardWidth - 1

    moveInvadersWithDirection(direction)

    if (rightEdge && direction === 1) {
        moveInvadersWithDirection(boardWidth - 1)

        // Increase invaders' speed
        if (difficulty.includes(Math.ceil(alienInvaders[alienInvaders.length - 1] / boardWidth))){
            clearInterval(invadersId)
            invadersId = null
            invaderSpeed -= 80
            invadersId = setInterval(moveInvaders, invaderSpeed)
        }
        console.log(Math.ceil(alienInvaders[alienInvaders.length - 1] / boardWidth), invaderSpeed)
        direction = -1
    } else if (leftEdge && direction === -1) {
        moveInvadersWithDirection(boardWidth + 1)

        // Increase invaders' speed
        if (difficulty.includes(Math.ceil(alienInvaders[alienInvaders.length - 1] / boardWidth))){
            clearInterval(invadersId)
            invadersId = null
            invaderSpeed -= 80
            invadersId = setInterval(moveInvaders, invaderSpeed)
        }
        console.log(Math.ceil(alienInvaders[alienInvaders.length - 1] / boardWidth), invaderSpeed)
        direction = 1
    }

    // If invaders collide with the shooter, GAME OVER
    if (squares[currentShooterIdx].classList.contains('invader', 'shooter')) {
        resultDisplay.innerHTML = 'GAME OVER.<br />Finally score: ' + score
        clearInterval(invadersId)
        document.removeEventListener('keydown', shootInvaders)
        document.removeEventListener('keydown', moveShooter)
        squares[currentShooterIdx].classList.add('boom')
    }

    //  If invaders were able to penetrate the bottom border, GAME OVER
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > boardHeight * boardWidth - boardWidth) {
            resultDisplay.innerHTML = 'GAME OVER!<br />Finally score: ' + score
            clearInterval(invadersId)
            document.removeEventListener('keydown', shootInvaders)
            document.removeEventListener('keydown', moveShooter)
            break
        }
    }

    // Winning condition
    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = 'You win!<br />Finally score: ' + score
        clearInterval(invadersId)
        document.removeEventListener('keydown', shootInvaders)
        document.removeEventListener('keydown', moveShooter)
    }
}

// Move the entire invaders depending on the direction
// direction == 1, move right
// direction == -1, move left
// direction == boardWidth + 1, move down
// direction == boardWidth - 1, move down
function moveInvadersWithDirection(direction) {
    removeInvaders()
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    drawInvaders()
}

// Shoot bullets
function shootInvaders(e) {
    let laserId
    let powerUpId
    let currentLaserIdx = currentShooterIdx
    let currentPowerUpIdx

    // setInterval function for falling power-ups
    function movePowerUp() {
        squares[currentPowerUpIdx].classList.remove('power-up')
        if (
            currentPowerUpIdx <= boardWidth * boardHeight - boardWidth && 
            !squares[currentPowerUpIdx].classList.contains('shooter')
        ) {
            currentPowerUpIdx += boardWidth
            squares[currentPowerUpIdx].classList.add('power-up')
        } else if (squares[currentPowerUpIdx].classList.contains('shooter')) {
            // Increase shooting speed
            shootingSpeed -= Math.floor(470 / totalPowerUps)
            console.log(shootingSpeed)
            powerLvl++ 
            powerLvlDisplay.textContent = powerLvl
            squares[currentShooterIdx].classList.add('power-up')
            clearInterval(powerUpId)
        }
    }

    // setInterval function for moving lasers
    function moveLaser() {
        squares[currentLaserIdx].classList.remove('laser')
        if (currentLaserIdx >= boardWidth && !squares[currentLaserIdx].classList.contains('invader')) {
            currentLaserIdx -= boardWidth
            squares[currentLaserIdx].classList.add('laser')
        }
        if (squares[currentLaserIdx].classList.contains('invader')) {
            score++
            resultDisplay.innerHTML = 'Score: ' + score
            squares[currentLaserIdx].classList.remove('laser')
            squares[currentLaserIdx].classList.remove('invader')
            squares[currentLaserIdx].classList.add('boom')
            clearInterval(laserId)

            // Power Up falling movement
            if (squares[currentLaserIdx].classList.contains('power-up')){
                currentPowerUpIdx = currentLaserIdx
                powerUpId = setInterval(movePowerUp, 100)
            }
            
            setTimeout(() => squares[currentLaserIdx].classList.remove('boom'), 300)

            const alienRemoved = alienInvaders.indexOf(currentLaserIdx)
            aliensRemoved.push(alienRemoved)
        }
    }

    if (e.key === 'ArrowUp' && Date.now() - lastShot > shootingSpeed) {
        laserId = setInterval(moveLaser, 100)
        lastShot = Date.now()
    }
}

invadersId = setInterval(moveInvaders, invaderSpeed)
document.addEventListener('keydown', shootInvaders)
document.addEventListener('keydown', moveShooter)