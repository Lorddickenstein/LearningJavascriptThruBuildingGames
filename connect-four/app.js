document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const result = document.querySelector('#result')
    const displayCurrentPlayer = document.querySelector('#current-player')
    const totalSquares = 49
    const boardWidth = 7
    const boardHeight = 6

    let squares = []
    let winningSquares = []
    let currentPlayer = 1
    displayCurrentPlayer.innerHTML = currentPlayer

    // Add squares
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div')
        square.setAttribute('id', i)
        if (i >= 42 && i <= 48) square.classList.add('taken')
        squares.push(square)
        grid.appendChild(square)
    }

    function checkDiagonal1 (index, player) {
        let counter = 1
        let position = index

        // Check Upper-Left Diagonal
        while (true) {
            if (
                position % boardWidth != 0 && 
                position > boardWidth - 1 &&
                squares[position - (boardWidth + 1)].classList.contains(player)
            ) {
                counter += 1
                position -= (boardWidth + 1)
                winningSquares.push(position)
            } else {
                position = index
                break
            }
        }

        // Check Lower-Right Diagonal
        while (true) {
            if (
                position % boardWidth != boardWidth - 1 &&
                position < boardHeight * boardWidth - boardWidth &&
                squares[position + boardWidth + 1].classList.contains(player)
            ) {
                counter += 1
                position += boardWidth + 1
                winningSquares.push(position)
            } else{
                position = index
                break
            }
        }

        // console.log('checkDiagonal1: ' + counter)
        // console.log('checkDiagonal1: ' + winningSquares)

        if (counter >= 4) return true 
        else {
            winningSquares.splice(1, winningSquares.length)
            return false
        }
    }

    function checkDiagonal2(index, player) {
        let counter = 1
        let position = index

        // Check Upper-Right Diagonal
        while (true) {
            if (
                position % boardWidth != boardWidth - 1 &&
                position > boardWidth - 1 &&
                squares[position - boardWidth + 1].classList.contains(player)
            ) {
                counter += 1
                position -= boardWidth - 1
                winningSquares.push(position)
            } else {
                position = index
                break
            }
        }

        // Check Lower-Left Diagonal
        while (true) {
            if (
                position % boardWidth != 0 &&
                position < boardHeight * boardWidth - boardWidth &&
                squares[position + boardWidth - 1].classList.contains(player)
            ) {
                counter += 1
                position += boardWidth - 1
                winningSquares.push(position)
            } else{
                position = index
                break
            }
        }

        // console.log('checkDiagonal2: ' + counter)
        // console.log('checkDiagonal2: ' + winningSquares)

        if (counter >= 4) return true 
        else {
            winningSquares.splice(1, winningSquares.length)
            return false
        }
    }

    function checkHorizontal(index, player) {
        let counter = 1
        let position = index

        // Check Left
        while (true) {
            if (
                position % boardWidth != 0 &&
                squares[position - 1].classList.contains(player)
            ){
                counter += 1
                position -= 1
                winningSquares.push(position)
            }else {
                position = index
                break
            }
        }

        // Check Right
        while (true) {
            if (
                position % boardWidth != boardWidth - 1 && 
                squares[position + 1].classList.contains(player)
            ){
                counter += 1
                position += 1
                winningSquares.push(position)
            }else {
                position = index
                break
            }
        }

        // console.log('checkHorizontal: ' + counter)
        // console.log('checkHorizontal: ' + winningSquares)

        if (counter >= 4) return true
        else {
            winningSquares.splice(1, winningSquares.length)
            return false
        }
    }

    function checkVertical(index, player) {
        let counter = 1
        let position = index

        // Check Up
        while (true) {
            if (
                position > 6 &&
                squares[position - 7].classList.contains(player)
            ){
                counter += 1
                position -= boardWidth
                winningSquares.push(position)
            }else {
                position = index
                break
            }
        }

        // Check Down
        while (true) {
            if (
                position < boardHeight * boardWidth - boardWidth &&
                squares[position + 7].classList.contains(player)
            ){
                counter += 1
                position += boardWidth
                winningSquares.push(position)
            }else {
                position = index
                break
            }
        }

        // console.log('checkVertical: ' + counter)
        // console.log('checkVertical: ' + winningSquares)

        if (counter >= 4) return true
        else {
            winningSquares.splice(1, winningSquares.length)
            return false
        }
    }

    function checkBoard(index, player) {
        if (
            checkDiagonal1(index, player) ||
            checkDiagonal2(index, player) ||
            checkHorizontal(index, player) ||
            checkVertical(index, player)
        ) {
            // console.log(winningSquares)
            for (let i = 0; i < winningSquares.length; i++){
                squares[winningSquares[i]].classList.remove(player)
                squares[winningSquares[i]].classList.add('winning-squares')
            }
            
            switch (player) {
                case 'player-one':
                    result.innerHTML = 'Player One Wins'
                    break
                case 'player-two':
                    result.innerHTML = 'Player Two Wins'
            }
        }
        
    }

    // Game field
    for (let i = 0; i < squares.length - boardWidth; i++) {
        squares[i].onclick = () => {
            let player
            // Stack squares if square below is taken and current square is not taken
            if (squares[i + 7].classList.contains('taken') &&! squares[i].classList.contains('taken')){
                if (currentPlayer == 1) {
                    player = 'player-one'
                    squares[i].classList.add('player-one')
                    squares[i].classList.add('taken')
                    currentPlayer = 2
                } else {
                    player = 'player-two'
                    squares[i].classList.add('player-two')
                    squares[i].classList.add('taken')
                    currentPlayer = 1
                }
                winningSquares.length = 0
                winningSquares.push(i)
                displayCurrentPlayer.innerHTML = currentPlayer
                checkBoard(i, player)
                // console.log(i)
            } else {
                alert('Cant go there')
            }
        }
    }

})