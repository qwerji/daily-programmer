// r/dailyprogrammer intermediate challenge #8
// https://www.reddit.com/r/dailyprogrammer/comments/psewf/2162012_challenge_8_intermediate/

// Challenge:
// Write a program that will print the english name of a value. for example, "1211" would become "one thousand two hundred eleven".
// for extra credit, allow it to read the english value of a number and output the integer.
// input: one hundred four output: 104

// Notes:
// This challenge was a real struggle for me, but partially just
// because I kept storing my lookup table in a really weird way that
// was just crippling how I wanted to do the logic. Eventually I realized this
// and ended up with something I am pretty happy with.
// TODO: decimals, "and"?

const N = [
    ['','one ','two ','three ','four ','five ','six ','seven ','eight ','nine '],
    ['ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '],
    ['','','twenty ','thirty ','forty ','fifty ','sixty ','seventy ','eighty ','ninety '],
    ['','thousand ','million ','billion ','trillion ','quadrillion ','quintillion ','sextillion ','septillion ',
    'octillion ','nonillian ','decillion ','undecillion ','duodecillion ','tredecillion ','quattuordecillion ',
    'quindecillion ','sexdecillion ','septendecillion ','octodecillion ','novemdecillion ','vigintillion ','centillion ']
]

function intToEnglish(int) {
    int = int.toString()
    let negative = false
    if (int[0] === '-') {
        negative = true
        int = int.replace('-','')
    }
    if (/[^0-9]/.test(int)) {
        return "Integers only plz."
    }
    // Convert integer into a 2D array of groups of 3
    const numArr = []
    let count = 0
    for (let i = int.length-1; i >= 0; i--) {
        if (!(count % 3)) {
            numArr.splice(0,0,[])
        }
        numArr[0].splice(0,0,int[i])
        count++
    }

    let phrase = ''
    for (let i = numArr.length-1; i >= 0; i--) {
        const group = numArr[i]
        let hundreds, tens, ones
        switch (group.length) {
            // 3 digit
            case 3:
                // Get out if they're all 0
                if (group[0] === '0' &&
                    group[1] === '0' &&
                    group[2] === '0') {
                    break
                }
                // Get the hundreds or tens place
                hundreds = N[0][group[0]]
                if (group[0] !== '0') {
                    hundreds += 'hundred '
                }
                // 11 -> 19
                if (group[1] === '1') {
                    tens = N[1][group[2]]
                // single digit
                } else if (group[1] === '0') {
                    ones = N[0][group[2]]
                } else {
                    tens = N[2][group[1]] + N[0][group[2]]
                }
                break
            case 2:
                // 11 -> 19
                if (group[0] === '1') {
                    tens = N[1][group[1]]
                } else {
                    tens = N[2][group[0]] + N[0][group[1]]
                }
                break
            default: // 1
                // zero -> nine
                ones = N[0][group[0]] || (i === int.length-1 ? 'zero' : '')
                break
        }
        // Don't use a group name if it's zeroes
        const groupName = (N[3][numArr.length-1-i])
        if (groupName === undefined) return 'Too large of a number for me.'
        const gn = !parseInt(group[0] + group[1] + group[2]) ? '' : groupName
        phrase = (hundreds||'') + (tens||'') + (ones||'') + gn + phrase
    }
    return (negative && !(phrase === 'zero') ? 'negative ' : '') + phrase
}

const numberIn = document.querySelector('.number'),
    textOut = document.querySelector('.text')

numberIn.addEventListener('keyup', function() {
    textOut.value = intToEnglish(`${this.value}`)
})
