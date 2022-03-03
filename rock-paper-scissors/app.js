const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button') 
let userChoice
let computerChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()
}))

function generateComputerChoice(){
    const randomNumber = Math.floor(Math.random() * 3) + 1// or use possibleChoices.length
    console.log(randomNumber)

    switch (randomNumber) {
        case 1: computerChoice = 'rock'; break;
        case 2: computerChoice = 'paper'; break;
        case 3: computerChoice = 'scissors'; break;
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult(){
    if (computerChoice === userChoice){
        result = 'draw'
    }
    if (computerChoice === 'rock' && userChoice === 'paper'){
        result = 'win'
    }
    if (computerChoice === 'rock' && userChoice === 'scissors'){
        result = 'lose'
    }
    if (computerChoice === 'paper' && userChoice === 'rock'){
        result = 'lose'
    }
    if (computerChoice === 'paper' && userChoice === 'scissors'){
        result = 'win'
    }
    if (computerChoice === 'scissors' && userChoice === 'paper'){
        result = 'lose'
    }
    if (computerChoice === 'scissors' && userChoice === 'rock'){
        result = 'win'
    }
    resultDisplay.innerHTML = result
}