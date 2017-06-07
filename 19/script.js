// r/dailyprogrammer difficult challenge #62
// https://www.reddit.com/r/dailyprogrammer/comments/urqbg/682012_challenge_62_difficult/

// Challenge:
// Write a program to solve 9x9 Sudoku puzzles.

// Notes:
// This one was a great challenge, because I love
// recursion and how it can be used, but for me it makes everything
// more difficult to conceptualize, and debug. 
// I also decided to experiment with web workers on this one, since
// the "worst case scenario" puzzle took my slow computer 4 mins
// to complete. The result was effective though, as proved by the 
// animation. I was super excited to try and use some css animations
// on one of these projects, and I am pretty pleased with the results.
// I also ended up with a nice, interactable, asynchronous Sudoku module 
// with an "onSolved" callback.

const testPuzzle = [
    [0, 8, 0,   0, 0, 0,   1, 5, 0],
    [4, 0, 6,   5, 0, 9,   0, 8, 0],
    [0, 0, 0,   0, 0, 8,   0, 0, 0],

    [0, 0, 0,   0, 0, 0,   0, 0, 0],
    [0, 0, 2,   0, 4, 0,   0, 0, 3],
    [3, 0, 0,   8, 0, 1,   0, 0, 0],

    [9, 0, 0,   0, 7, 0,   0, 0, 0],
    [6, 0, 0,   0, 0, 0,   0, 0, 4],
    [1, 5, 0,   0, 0, 0,   0, 9, 0]
]

const inputs = document.querySelectorAll('.box'),
    solveButton = document.querySelector('.solve'),
    clearButton = document.querySelector('.clear'),
    display = document.querySelector('.display'),
    grid = document.querySelector('.grid'),
    inputGrid = [[]]

let solving = false

inputs.forEach(input => {
    inputGrid[inputGrid.length-1].push(input)
    if (inputGrid[inputGrid.length-1].length >= 9 && inputGrid.length !== 9) {
        inputGrid.push([])
    }
})

for (let i = 0; i < inputGrid.length; i++) {
    for (let j = 0; j < inputGrid[i].length; j++) {
        inputGrid[i][j].value = testPuzzle[i][j] || ''
    }
}

solveButton.addEventListener('click', () => {
    if (solving) return
    const puzzle = [[]]
    inputGrid.forEach(row => row.forEach(input => {
        let val = parseInt(input.value)
        if (isNaN(val) || val > 9 || val < 1) {
            val = 0
        }
        puzzle[puzzle.length-1].push(val)
        if (puzzle[puzzle.length-1].length >= 9 && puzzle.length !== 9) {
            puzzle.push([])
        }
    }))
    if (Sudoku.isValid(puzzle)) {
        solving = true
        animateGrid()
        solveButton.classList.add('solving')
        clearButton.classList.add('solving')
        display.textContent = '|'
        Sudoku.solve(puzzle)
    } else {
        display.textContent = 'Invalid puzzle.'
    }
})

Sudoku.onSolve = (solved, time) => {
    display.textContent = `${time}ms`
    stopGridAnimation(solved)
}

clearButton.addEventListener('click', () => {
    if (solving) return
    for (let i = 0; i < inputGrid.length; i++) {
        for (let j = 0; j < inputGrid[i].length; j++) {
            inputGrid[i][j].value = ''
        }
    }
    display.textContent = ''
})

function endAnimation(val,last) {
    this.value = val
    this.classList.remove('flow')
    if (last) {
        solving = false
        solveButton.classList.remove('solving')
        clearButton.classList.remove('solving')
    }
}

function animateGrid() {
    display.style.animationName = 'spin'
    let delay = 0
    for (let i = 0; i < inputGrid.length; i++) {
        for (let j = 0; j < inputGrid[i].length; j++) {
            delay += 0.02
            inputGrid[i][j].classList.add('flow')
            inputGrid[i][j].style.animationDelay = delay + 's'
        }
    }
}

function stopGridAnimation(solved) {
    display.style.animationName = ''
    for (let i = 0; i < inputGrid.length; i++) {
        for (let j = 0; j < inputGrid[i].length; j++) {
            let input = inputGrid[i][j], last = false
            if (i === inputGrid.length-1 && j === i) {
                last = true
            }
            input.addEventListener(
                'animationiteration', 
                endAnimation.bind(input,solved[i][j],last)
            )
        }
    }
}
