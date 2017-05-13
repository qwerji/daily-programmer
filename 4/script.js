// r/dailyprogrammer difficult challenge #1
// https://www.reddit.com/r/dailyprogrammer/comments/pii6j/difficult_challenge_1/

// Challenge:
// we all know the classic "guessing game" with higher or lower prompts. 
// lets do a role reversal; you create a program that will guess numbers between 1-100, 
// and respond appropriately based on whether users say that the number is too high or too low. 
// Try to make a program that can guess your number based on user input and great code!

const display = document.querySelector('.display'),
    highButton = document.querySelector('.high'),
    lowButton = document.querySelector('.low'),
    correctButton = document.querySelector('.correct'),
    resetButton = document.querySelector('.reset'),
    currentRange = [0,100]

let guessCount = 0,
    currentGuess = randomInt(40,60)

function displayGuess() {
    display.textContent = `Is it ${currentGuess}?`
    guessCount++
}

highButton.addEventListener('click', () => {
    currentRange[1] = currentGuess - 1
    currentGuess = getGuess()
    displayGuess()
})

lowButton.addEventListener('click', () => {
    currentRange[0] = currentGuess + 1
    currentGuess = getGuess()
    displayGuess()
})

correctButton.addEventListener('click', () => {
    display.textContent = `I got it right guys! I knew it, it was ${currentGuess}! It only took me ${guessCount} tries.`
})

resetButton.addEventListener('click', () => {
    currentRange[0] = 0
    currentRange[1] = 100
    currentGuess = randomInt(40,60)
    guessCount = 0
    displayGuess()
})

function getGuess() {
    const diff = currentRange[1] - currentRange[0]
    return Math.floor(currentRange[0] + (diff/2))
}

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

displayGuess()
