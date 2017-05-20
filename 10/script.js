// r/dailyprogrammer easy challenge #7
// https://www.reddit.com/r/dailyprogrammer/comments/pr2xr/2152012_challenge_7_easy/

// Challenge:
// Write a program that can translate Morse code in the format of ...---...
// A space and a slash will be placed between words. ..- / --.-
// For bonus, add the capability of going from a string to Morse code.
// Super-bonus if your program can flash or beep the Morse.
// This is your Morse to translate:
// .... . .-.. .-.. --- / -.. .- .. .-.. -.-- / .--. .-. --- --. .-. .- -- -- . .-. / --. --- --- -.. / .-.. ..- -.-. -.- / --- -. / - .... . / -.-. .... .- .-.. .-.. . -. --. . ... / - --- -.. .- -.--

// Ideas:
// Hover over page title, becomes morse code
// When SOS is entered, have it turn red, or something like that
// How to handle unrecognized characters - maybe a "?" or just say
// the code was poorly formatted.
// Use the dichotomic search table for decoding
// Translate while typing

// Notes:
// This was really fun to build. While it is probably the most inefficient
// solution to a problem that could probably be solved by a hash table,
// I was just really inspired when I saw this:
// https://en.wikipedia.org/wiki/Morse_code#/media/File:Morse_code_tree3.png
// As soon as I saw the tree, I knew I had to try and make it work.
// The only missing functionality is open/close parens (), and the "ch" code.
// So here's my Morse code translator, using a binary search tree!

const Morse = (() => {

    function getLetter(l) {
        // Start looking for the letter at the start of the MorseTable
        return find(l, MorseTable) || ''
    }

    function find(l, current, memo='') {
        // If the current place doesn't exist, the letter isn't on this branch
        if (!current) return null
        // If the letter is found, return the path up until this point
        if (current.char === l) {
            return memo
        }
        // Return either the left or right branch's results, recording their
        // respective destinations in the memo
        return find(l, current['.'], memo+'.') || find(l, current['-'], memo+'-')
    }

    return {
        decode: code => {
            // Split the code into word arrays, and letters into letter arrays
            code = code.split(' / ').map(word => word.split(' '))
            let msg = ''
            // For each word (.... . .-.. .-.. ---)
            code.forEach((cWord,idx) => {
                let word = ''
                // For each letter (....)
                cWord.forEach(cLetter => {
                    let current = MorseTable
                    // Using each dot/dash in order, traverse the tree
                    for (let i = 0; i < cLetter.length; i++) {
                        if (!current[cLetter[i]]) break
                        current = current[cLetter[i]]
                    }
                    // The correct character is added to the word
                    if (current.char) word += current.char
                })
                msg += (idx === 0 ? '' : ' ') + word
            })
            return msg.includes("undefined") ? "Code is poorly formatted." : msg
        },
        code: str => {
            str = str.toLowerCase()
            let code = ''
            for (let i = 0; i < str.length; i++) {
                if (str[i] === ' ') {
                    code += ' /'
                } else {
                    code += (i === 0 ? '' : ' ') + getLetter(str[i])
                }
            }
            return code
        }
    }
})()

const englishText = document.querySelector('.english'),
    morseText = document.querySelector('.morse'),
    title = document.querySelector('.title')

englishText.addEventListener('keyup', function() {
    if (this.value !== '') {
        morseText.value = Morse.code(this.value)
    } else {
        morseText.value = ''
    }
})

morseText.addEventListener('keyup', function() {
    if (this.value !== '') {
        englishText.value = Morse.decode(this.value)
    } else {
        englishText.value = ''
    }
})

title.addEventListener('mouseover', function() {
    this.textContent = '-- --- .-. ... . / -.-. --- -.. . / - .-. .- -. ... .-.. .- - --- .-.'
})

title.addEventListener('mouseout', function() {
    this.textContent = 'Morse Code Translator'
})

// document.querySelector('.play').addEventListener('click', () => {

// })