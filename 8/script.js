// r/dailyprogrammer easy challenge #4
// https://www.reddit.com/r/dailyprogrammer/comments/pm6oj/2122012_challenge_4_easy/

// Challenge:
// Your challenge for today is to create a random password generator!
// For extra credit, allow the user to specify the amount of passwords to generate.
// For even more extra credit, allow the user to specify the length of the strings they want to generate!

let passwords = []
const display = document.querySelector('.display')

function generate(e) {
    e.preventDefault()

    // Gather the user's options
    const options = {}
    for (let i = 0; i < 6; i++) {
        const input = this[i]
        if (input.localName === 'input') {
            if (input.type === 'checkbox') {
                options[input.name] = input.checked
            } else {
                options[input.name] = input.value
            }
        }
    }

    // Defaults
    options.length = parseInt(options.length) || 16
    options.quantity = parseInt(options.quantity) || 10
    
    // This creates a pool of potential characters based on the user's
    // selected options, and the ascii table
    // This way, each option has an equal chance of being picked as
    // the next character of the password
    const charPool = (function() {
        const pool = []

        // Symbols = 33-47, 58-64, 91-96, 123-126
        if (options.symbols) {
            const symbols = [],
                ranges = [
                    [33, 47],
                    [58, 64],
                    [91, 96],
                    [123, 126]
                ]
            for (let i = 0; i < ranges.length; i++) {
                const range = ranges[i]
                for (let j = range[0]; j <= range[1]; j++) {
                    symbols.push(String.fromCharCode(j))
                }
            }
            pool.push(symbols)
        }

        // Digits = 48-57
        if (options.numbers) {
            const numbers = []
            for (let i = 48; i <= 57; i++) {
                numbers.push(String.fromCharCode(i))
            }
            pool.push(numbers)
        }

        // Uppercase = 65-90
        if (options.uppercase) {
            const uppers = []
            for (let i = 65; i <= 90; i++) {
                uppers.push(String.fromCharCode(i))
            }
            pool.push(uppers)
        }

        // Lowercase = 97-122
        if (options.lowercase) {
            const lowers = []
            for (let i = 97; i <= 122; i++) {
                lowers.push(String.fromCharCode(i))
            }
            pool.push(lowers)
        }
        return pool
    })()

    passwords = []

    if (charPool.length <= 0) {
        passwords.push('Please select at least one checkbox.')
        displayList()
        return
    }

    function randomInt(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // Generate the required number of passwords at the required
    // length, by getting random indicies from the charPool and 
    // it's sub-arrays
    for (let i = 0; i < options.quantity; i++) {
        let password = ''
        for (let j = 0; j < options.length; j++) {
            const subChars = charPool[randomInt(0,charPool.length-1)]
            password += subChars[randomInt(0,subChars.length-1)]
        }
        passwords.push(password)
    }
    displayList()
}
document.querySelector('.generator').addEventListener('submit', generate)

function removeAllChildNodes(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild)
    }
}

function displayList() {
    removeAllChildNodes(display)
    for (let i = 0; i < passwords.length; i++) {
        const li = document.createElement('li')
        li.textContent = passwords[i]
        display.appendChild(li)
    }
}
