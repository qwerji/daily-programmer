// r/dailyprogrammer easy challenge #3
// https://www.reddit.com/r/dailyprogrammer/comments/pkw2m/2112012_challenge_3_easy/

// Challenge:
// Welcome to cipher day!
// write a program that can encrypt texts with an alphabetical caesar cipher. 
// This cipher can ignore numbers, symbols, and whitespace.
// for extra credit, add a "decrypt" function to your program!

// Notes:
// This probably isn't anything groundbreaking, but I decided to use the length
// of the string to determine the rotation number, and the character codes as the
// guide.
// rdcvgpih, ndj uxvjgts xi dji! hcpxats xi.

const input = document.querySelector('.secret-message'),
    encryptButton = document.querySelector('.encrypt'),
    decryptButton = document.querySelector('.decrypt'),
    display = document.querySelector('.display')

// a - 97
// z - 122

function easyCipher(str, decrypt=false) {
    // Alpha characters only
    const regex = /^[a-z]+$/
    // lowercase for simplicity
    str = str.toLowerCase()
    // Rotate forwards when encrypting, backwards when decrypting
    let result = '', num = str.length
    if (decrypt) {
        num = -str.length 
        // Offset by 1 if the length is 26
        if (num % 26 === 0) {
            num -= 1
        }
    } else {
        if (num % 26 === 0) {
            num += 1
        }
    }
    for (let i = 0; i < str.length; i++) {
        if (regex.test(str[i])) {
            // Normalize code to 0-25
            let code = str.charCodeAt(i) + num - 97
            // Wrap code around back into range
            if (code > 25) {
                code %= 26
            }
            while (code < 0) {
                code += 26
            }
            // Move code back to original offset
            code += 97
            // Get the character at that code
            result += String.fromCharCode(code)
        } else {
            result += str[i]
        }
    }
    return result
}

function handleButtonClick(e) {
    display.textContent = easyCipher(input.value, e.target === decryptButton)
    input.value = ''
}

encryptButton.addEventListener('click', handleButtonClick)
decryptButton.addEventListener('click', handleButtonClick)
