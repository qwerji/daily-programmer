// r/dailyprogrammer easy challenge #16
// https://www.reddit.com/r/dailyprogrammer/comments/q8aom/2272012_challenge_16_easy/

// Challenge:
// Write a function that takes two strings and removes from the first string any 
// character that appears in the second string. For instance, if the first string is 
// “Daily Programmer” and the second string is “aeiou ” the result is “DlyPrgrmmr”.

// Notes:
// I went for simplicity on this one. Using a method for
// backwards iteration that I haven't tried yet, but I
// like it. Much more concise feeling than a for loop.

function filterString(a, b) {
    let i = b.length
    while (i--) { 
        while (a.includes(b[i])) { 
            a = a.replace(b[i],'')
        }
    }
    return a
}
const newStr = filterString('Daily Programmer', 'aeiou ')
console.log(newStr) // DlyPrgrmmr
