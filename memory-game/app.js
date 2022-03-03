const cardArray = [
    {name: 'fries', img: 'images/fries.png'},
    {name: 'cheeseburger', img: 'images/cheeseburger.png'},
    {name: 'hotdog', img: 'images/hotdog.png'},
    {name: 'ice-cream', img: 'images/ice-cream.png'},
    {name: 'milkshake', img: 'images/milkshake.png'},
    {name: 'pizza', img: 'images/pizza.png'},
    {name: 'fries', img: 'images/fries.png'},
    {name: 'cheeseburger', img: 'images/cheeseburger.png'},
    {name: 'hotdog', img: 'images/hotdog.png'},
    {name: 'ice-cream', img: 'images/ice-cream.png'},
    {name: 'milkshake', img: 'images/milkshake.png'},
    {name: 'pizza', img: 'images/pizza.png'}
]

// Shufles the array into random order
cardArray.sort(() => 0.5 - Math.random())
console.log(cardArray)

// # means to search for an id of 'grid'
const resultDisplay = document.querySelector('#result')
const scoreDisplay = document.querySelector('#score')
const gridDisplay = document.querySelector('#grid')

let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []

function createBoard(){
    for (let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}

function checkMatch(){
    // Take all the img from an element with an id of grid
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    console.log(cards)
    console.log('checking for a match')

    // Clicked on the same card
    if (optionOneId == optionTwoId){
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('clicked the same card')
    } else if (cardsChosen[0] == cardsChosen[1]) {
        // Change the img to white if they matched
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')

        // Remove the click event listener
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    }
    scoreDisplay.innerHTML = cardsWon.length
    cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length === cardArray.length/2){
        resultDisplay.textContent = "Congratualtions! You did it"
    }
}

function flipCard(){
    // Get the attribute of the clicked component
    const cardId = this.getAttribute('data-id')

    // Add the name and id to the array of chosen cards
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)

    // Display the values in console
    console.log(cardsChosen)
    console.log(cardsChosenIds)

    // Change the image of the card once clicked
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
        
    }
}

createBoard()