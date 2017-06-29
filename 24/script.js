// r/dailyprogrammer pt1 + pt2 challenge #199
// https://www.reddit.com/r/dailyprogrammer/comments/2tr6yn/2015126_challenge_199_bank_number_banners_pt_1/
// https://www.reddit.com/r/dailyprogrammer/comments/2u0fyx/2015126_challenge_199_bank_number_banners_pt_2/

// Challenge:
// Convert digits: 9876543210
// Into:
//  _  _  _  _  _     _  _     _
// |_||_|  ||_ |_ |_| _| _| | | |
//   ||_|  ||_| _|  | _||_  | |_|
//
// and vice-versa

const banner = (() => {

    // Defines each digit
    const table = [
        [' _ ','| |','|_|'], // 0
        ['   ',' | ',' | '], // 1
        [' _ ',' _|','|_ '], // 2
        [' _ ',' _|',' _|'], // 3
        ['   ','|_|','  |'], // 4
        [' _ ','|_ ',' _|'], // 5
        [' _ ','|_ ','|_|'], // 6
        [' _ ','  |','  |'], // 7
        [' _ ','|_|','|_|'], // 8
        [' _ ','|_|','  |'], // 9
    ]

    // Converts number to the banner form
    function fromNumber(num) {
        // Convert to string so each digit can be iterated over
        num = `${num}`
        // 3 row display
        const rows = ['','','']
        // For each digit
        for (let i = 0; i < num.length; i++) {
            // Get the banner digit by index
            const digit = table[num[i]]
            // Add the digits rows to the display
            for (let j = 0; j < digit.length; j++) {
                rows[j] += digit[j]
            }
        }
        // Display
        console.log(rows[0])
        console.log(rows[1])
        console.log(rows[2])
        return rows
    }

    function rowsAreEqual(row1,row2) {
        let equal = true
        // If any of the digit's rows are not equal,
        // it is not a match
        row1.forEach((col,i) => {
            if (col !== row2[i]) equal = false
        })
        return equal
    }

    function toNumber(rows) {
        let num = ''
        for (let i = 0; i < rows[0].length; i+=3) {
            // Reconstruct each digit by pulling out 3 characters
            // at a time from each row
            const row = [
                rows[0][i] + rows[0][i+1] + rows[0][i+2],
                rows[1][i] + rows[1][i+1] + rows[1][i+2],
                rows[2][i] + rows[2][i+1] + rows[2][i+2]
            ]
            // Find the corresponding index
            table.forEach((tableRow,i) => {
                if (rowsAreEqual(tableRow, row)) {
                    // Add it to the number
                    num += i
                }
            })
        }
        console.log(num)
        return num
    }

    return { fromNumber, toNumber }

})()

banner.toNumber(banner.fromNumber(9876543210))
