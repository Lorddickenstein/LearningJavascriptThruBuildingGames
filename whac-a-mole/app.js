const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const start_btn = document.querySelector('#start-btn')

let result = 0
let hitPosition
let currentTime = 10
let timerId = null
let countDownTimerId = null

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
        square.classList.remove('mole-squashed')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition){
            result++
            score.textContent = result
            squares[hitPosition-1].classList.remove('mole')
            squares[hitPosition-1].classList.add('mole-squashed')
            hitPosition = null
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 800)
    countDownTimerId = setInterval(countDown, 1000)
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('Game Over! Your final score is ' + result)
        squares.forEach(square => {
            square.classList.remove('mole')
            square.classList.remove('mole-squashed')
        })
        start_btn.disabled = false
    }
}

start_btn.addEventListener('click', () => {
    currentTime = 10
    result = 0
    score.textContent = result
    start_btn.disabled = true
    moveMole()
})