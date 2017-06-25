// r/dailyprogrammer easy challenge #180
// https://www.reddit.com/r/dailyprogrammer/comments/2ggy30/9152014_challenge180_easy_looknsay/

// Challenge:
// The Look and Say sequence is an interesting sequence of numbers where each term 
// is given by describing the makeup of the previous term.
// The 1st term is given as 1. The 2nd term is 11 ('one one') because the first term (1) 
// consisted of a single 1. The 3rd term is then 21 ('two one') because the second 
// term consisted of two 1s.

// Notes:
// The examples seemed to not take the total number of each unique digit, but only
// as consecutive digits, so 112312 would become 2112131112 instead of 312213. I decided
// to do both.
// What's interesting is with the non-consecutive method, the number seems to level 
// out after around 6-10 lines depending on the seed. The number just stays the same, 
// because eventually the amount of each digit creates the same number that it seeded from.
// Using the consecutive method, it seems to have no upper bound.

function lookAndSay(lineCount=5, seedNum=1, consecutive=false) {
    // create the initial arrays, arr[0] being the seed
    const arr = [[seedNum],[1,seedNum]]
    let func = getLine
    if (consecutive) func = getLineConsecutive
    // Add the specified number of lines
    for (let i = 0; i < lineCount; i++) {
        arr.push(func(arr))
    }
    return arr
}

function getLine(arr) {
    // create hash to keep track of digit amounts
    const hash = {}
    // Loop over the most recently added line
    arr[arr.length-1].forEach(num => {
        // If the number already exists, increment it
        if (hash[num]) {
            hash[num]++
        // otherwise, add it and set it to 1
        } else {
            hash[num] = 1
        }
    })
    const line = []
    // push the resulting count of a number, and then the
    // number itself into the new line array
    for (let num in hash) {
        line.push(hash[num])
        line.push(parseInt(num))
    }
    return line
}

function getLineConsecutive(arr) {
    // set arr to equal the most recent line
    arr = arr[arr.length-1]
    // Initialize the variables to the first digit
    let currNum = arr[0], currCount = 1
    const line = []
    for (let i = 1; i < arr.length; i++) {
        const num = arr[i]
        // If multiple numbers in a row are found, increment the count
        if (num === currNum) {
            currCount++
        // Other wise, add the count and the number to the line
        // and set the current variables to the new number
        } else {
            line.push(currCount)
            line.push(currNum)
            currCount = 1
            currNum = num
        }
    }
    // Add the last number set
    line.push(currCount)
    line.push(currNum)
    return line
}

console.log(lookAndSay(5,1,true))