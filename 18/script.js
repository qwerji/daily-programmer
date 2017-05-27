// r/dailyprogrammer easy challenge #18
// https://www.reddit.com/r/dailyprogrammer/comments/qit0h/352012_challenge_18_easy/

// Challenge:
// Often times in commercials, phone numbers contain letters so that they're easy 
// to remember (e.g. 1-800-VERIZON). Write a program that will convert a phone number 
// that contains letters into a phone number with only numbers and the appropriate dash. 
// Click here to learn more about the telephone keypad.
// Example Execution: Input: 1-800-COMCAST Output: 1-800-266-2278

function convertPhoneNumber(str) {
    const numpad = [
        [],[],['a','b','c'],['d','e','f'],
        ['g','h','i'],['j','k','l'],['m','n','o'],
        ['p','q','r','s'],['t','u','v'],['w','x','y','z']
    ]
    let num = ''
    for (let i = 0; i < str.length; i++) {
        let found = false, digit = str[i]
        for (let j = 0; j < numpad.length; j++) {
            if (numpad[j].includes(digit.toLowerCase())) {
                num += j
                found = true
                break
            }
        }
        if (str.length-i === 5) num += '-'
        if (!found) num += digit
    }
    return num
}

const display = document.querySelector('.display'),
    input = document.querySelector('.input')
document.querySelector('.convert').addEventListener('click', () => {
    display.textContent = convertPhoneNumber(input.value)
})
