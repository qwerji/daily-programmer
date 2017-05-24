// r/dailyprogrammer difficult challenge #10
// https://www.reddit.com/r/dailyprogrammer/comments/pv92x/2182012_challenge_10_difficult/

// Challenge:
// Your task is to implement the interactive game of hangman
// bonus point for making the game unique. be more creative!

// Notes:
// For this one, I wanted to use the "terminal" interface I created
// for the text based adventure challenge, so a lot of the code from that
// I brought into this project

(() => {

const outputElt = document.querySelector('main pre'),
    inputElt = document.querySelector('main input'),
    form = document.querySelector('main form'),
    savedInputs = []

let savedInputsIdx = 0, 
    winLoss = [0,0],
    strikes = 0,
    secretWord = '',
    userWord = [],
    usedLetters = [],
    gameIsOver = true

form.addEventListener('submit', function(e) {
    e.preventDefault()
    const input = inputElt.value.toLowerCase()
    this.reset()
    if (gameIsOver) {
        if (input === 'r') {
            gameIsOver = false
            save(0,1)
            generateUI()
        }
        if (input.includes('snail')) {
            printToConsole('🐌')
        }
        return
    }
    if (!input || input.length <= 0) return
    if (!/^[A-Za-z]+$/.test(input)) {
        printToConsole('Invalid input.')
        return
    }
    submitGuess(input)
    savedInputs.splice(0, 0, input)
})

form.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
        e.preventDefault()
        inputElt.value = savedInputs[savedInputsIdx] || inputElt.value
        savedInputsIdx++
    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        inputElt.value = savedInputs[savedInputsIdx] || inputElt.value
        savedInputsIdx--
    }
    if (savedInputsIdx < 0) {
        savedInputsIdx = 0
    } else if (savedInputsIdx >= savedInputs.length) {
        savedInputsIdx = savedInputs.length-1
    }
})

function clearConsole() {
    outputElt.textContent = ''
}

function printToConsole(text) {
    outputElt.textContent += `\n${text}`
}

function submitGuess(guess) {
    if (guess.length > 1) {
        if (guess === secretWord) {
            gameover('Correct!', true)
        } else {
            strikes++
            if (strikes === 8) {
                gameover(`Game Over. The word was "${secretWord}".`)
                return
            }
            generateUI()
            printToConsole('Incorrect.')
        }
        return
    }
    if (usedLetters.includes(guess)) return
    let found = false, testWord = ''
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === guess) {
            userWord[i] = guess
            found = true
        }
        testWord += userWord[i]
    }
    if (testWord === secretWord) {
        gameover('Correct!', true)
        return
    }
    if (!found) {
        usedLetters.push(guess)
        strikes++
        if (strikes === 8) {
            gameover(`Game Over. The word was "${secretWord}".`)
            return
        }
    }
    generateUI()
}

function gameover(text, win=false) {
    gameIsOver = true
    generateUI()
    printToConsole(text)
    printToConsole('Enter "r" to try again!')
    reset()
    if (win) {
        save(1)
    } else {
        save()
    }
}

function reset() {
    strikes = 0
    secretWord = 'jazz'
    userWord = setUserWord()
    wordAPI(word => {
        secretWord = word
        userWord = setUserWord()
    })
    usedLetters = []
    gameIsOver = true
}

function setUserWord() {
    let wordArr = []
    for (let i = 0; i < secretWord.length; i++) {
        wordArr.push('_')
    }
    return wordArr
}

function generateUI() {
    clearConsole()
    const head = strikes >= 1 ? 'O' : ' ',
        lArm = strikes >= 2 ? '/' : ' ',
        torso = strikes >= 3 ? '|' : ' ',
        rArm = strikes >= 4 ? '\\' : ' ',
        lLeg = strikes >= 5 ? '/' : ' ',
        rLeg = strikes >= 6 ? '\\' : ' ',
        lFoot = strikes >= 7 ? '_' : ' ',
        rFoot = strikes >= 8 ? '_' : ' '

    printToConsole(
`
    ______
   |     ${head}
   |    ${lArm}${torso}${rArm}
   |   ${lFoot}${lLeg} ${rLeg}${rFoot}
   |
 __|__`)

    printToConsole(
`
 ${generateUsedLetters()}
 ${generateBlanks()}

`)
}

function generateBlanks() {
    let blanks = ''
    userWord.forEach(letter => {
        blanks += letter + ' '
    })
    return blanks
}

function generateUsedLetters() {
    if (!usedLetters.length) return ''
    let blanks = '| ',
        topSpace = '| ',
        container = ''
    usedLetters.forEach(letter => {
        topSpace += '  '
        container += '__'
        blanks += letter + ' '
    })
    blanks += '|'
    topSpace += '|'
    container += '_'
    blanks = 'Used letters:\n' + ' ' + container + '\n' + topSpace + '\n' + blanks + '\n|' + container + '|\n'
    return blanks
}

function startSequence() {
    let i = 0
    const seqence = [
        "                ______",
        "               |     O",
        "               |    /|\\",
        "               |   _/ \\_",
        "               |",
        "             __|__",
        `  _    _                   win percentage: ${winPercentage()}%`,
        ` | |  | |                                        `,
        " | |__| | __ _ _ __   __ _ _ __ ___   __ _ _ __  ",
        " |  __  |/ _` | '_ \\ / _` | '_ ` _ \\ / _` | '_ \\ ",
        " | |  | | (_| | | | | (_| | | | | | | (_| | | | |",
        " |_|  |_|\\__,_|_| |_|\\__, |_| |_| |_|\\__,_|_| |_|",
        "                      __/ |     (hardmode)       ",
        "                     |___/                       ",
        "-------------------------------------------------",
        "--------        Enter 'r' to start!      --------",
        "-------------------------------------------------",
    ]
    printToConsole(seqence[i])
    i++
    const printer = setInterval(() => {
        printToConsole(seqence[i])
        i++
        if (i >= seqence.length) {
            clearInterval(printer)
        }
    }, 100)
}

function winPercentage() {
    const dec = winLoss[0]/winLoss[1]
    if (isNaN(dec)) return 0
    return (dec*100).toFixed(0)
}

window.addEventListener('click', () => {
    inputElt.focus()
})

function wordAPI(cb) {
    const url = `http://www.setgetgo.com/randomword/get.php?len=${randomInt(3,10)}`
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            cb(this.response.toLowerCase())
        }
    }
    xhr.open("GET", url, true)
    xhr.setRequestHeader("Accept", "application/json")
    querying = true
    xhr.send()
}

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function save(win=0,total=0) {
    const wins = localStorage.getItem('win-loss')
    if (wins) {
        winLoss = JSON.parse(wins)
    }
    winLoss[0] = parseFloat(winLoss[0])
    winLoss[1] = parseFloat(winLoss[1])
    winLoss[0] += win
    winLoss[1] += total
    localStorage.setItem('win-loss', JSON.stringify(winLoss))
}

reset()
save()

window.onload = startSequence

})()
