const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
let currentShooterIdx = 202
let boardWidth = 15
let boardHeight = 15
let direction = 1
let invadersId
let score = 0
let aliensRemoved = []

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    square.setAttribute('id', i)
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))
let alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function drawInvaders() {
    for(let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i))
            squares[alienInvaders[i]].classList.add('invader')
    }
}

drawInvaders()

function removeInvaders() {
    for(let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIdx].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIdx].classList.remove('shooter')

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
}

function moveInvaders() {
    const leftEdge = alienInvaders[0] % boardWidth === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % boardWidth === boardWidth - 1
    removeInvaders()

    moveInvadersWithDirection(direction)

    if (rightEdge && direction === 1) {
        moveInvadersWithDirection(boardWidth - 1)
        direction = -1
    } else if (leftEdge && direction === -1) {
        moveInvadersWithDirection(boardWidth + 1)
        direction = 1
    }

    if (squares[currentShooterIdx].classList.contains('invader', 'shooter')) {
        resultDisplay.innerHTML = 'Game Over.<br />Finally score: ' + score
        clearInterval(invadersId)
        document.removeEventListener('keydown', shootInvaders)
        document.removeEventListener('keydown', moveShooter)
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > boardHeight * boardWidth - boardWidth) {
            resultDisplay.innerHTML = 'Game Over!<br />Finally score: ' + score
            clearInterval(invadersId)
            document.removeEventListener('keydown', shootInvaders)
            document.removeEventListener('keydown', moveShooter)
            break
        }
    }

    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = 'You win!<br />Finally score: ' + score
        clearInterval(invadersId)
        document.removeEventListener('keydown', shootInvaders)
        document.removeEventListener('keydown', moveShooter)
    }
}

function moveInvadersWithDirection(direction) {
    removeInvaders()
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    drawInvaders()
}


function shootInvaders(e) {
    let laserId
    let currentLaserIdx = currentShooterIdx

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
            
            setTimeout(() => squares[currentLaserIdx].classList.remove('boom'), 300)

            const alienRemoved = alienInvaders.indexOf(currentLaserIdx)
            aliensRemoved.push(alienRemoved)
        }
    }

    if (e.key === 'ArrowUp') laserId = setInterval(moveLaser, 100)
}

invadersId = setInterval(moveInvaders, 500)
document.addEventListener('keydown', shootInvaders)
document.addEventListener('keydown', moveShooter)