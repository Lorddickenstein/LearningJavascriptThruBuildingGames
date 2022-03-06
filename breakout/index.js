const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let timerID
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 30]
let ballCurrentPosition = ballStart

let x = 10
let y = 270

// Create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// All blocks
const blocks = []
for (let i = 0; i < 3; i++){
    x = 10
    for (let j = 0; j < 5; j++){
        blocks.push(new Block(x, y))
        x += 110
    }
    y -= 30
}

// Draw all blocks
function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlock()

// Add user
const user = document.createElement('div')
user.classList.add('user')
drawUser() 
grid.appendChild(user)

// Draw user
function drawUser() {
    if (currentPosition[0] <= 0) { 
        currentPosition[0] = 0
    } else if (currentPosition[0] >= boardWidth - blockWidth) {
        currentPosition[0] = boardWidth - blockWidth
    }
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// Draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// Move user
function moveUser(e) {
    switch(e.key){
        case 'ArrowLeft':
            currentPosition[0] -= 10; 
            break
        case 'ArrowRight':
            currentPosition[0] += 10; 
            break
    }
    drawUser()
}

function mouseUser(e) {
    currentPosition[0] = e.clientX
    drawUser()
}

document.addEventListener('keydown', moveUser)
grid.setAttribute('onmouseclick', 'mouseUser(e)')
document.addEventListener('mousemove', mouseUser)

// Add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// Move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 10)

// Check for collisions
function checkForCollisions() {

    // Check for block collisions
    for (let i = 0; i < blocks.length; i++){
        if (
            ballCurrentPosition[0] >= blocks[i].bottomLeft[0] && 
            ballCurrentPosition[0] <= blocks[i].bottomRight[0] && 
            ballCurrentPosition[1] >= blocks[i].bottomLeft[1] - ballDiameter &&
            ballCurrentPosition[1] <= blocks[i].topLeft[1]){
            changeDirection('top')
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            score++
            scoreDisplay.innerHTML = score
        }
    }

    // Check for wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter)) {
        // Collided with the right wall
        changeDirection('right')
    } else if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)){
        // Collided with the top wall
        changeDirection('top')
    } else if (ballCurrentPosition[0] <= 0) {
        // Collided with the left wall
        changeDirection('left')
    } else if (ballCurrentPosition[1] <= 0) {
        // Collided with the bottom wall
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You Lose'
        document.removeEventListener('keydown', moveUser)
        document.removeEventListener('mousemove', mouseUser)
    }
}

// Change direction depending on which wall it collided
function changeDirection(wall) {
    switch(wall){
        case 'right':
            xDirection = -2
            break;
        case 'top':
            yDirection = -2
            break;
        case 'left':
            xDirection = 2
            break;
        case 'bottom':
            yDirection = 2
            break;
    }
}