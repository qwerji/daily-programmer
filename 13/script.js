// r/dailyprogrammer difficult challenge #8
// https://www.reddit.com/r/dailyprogrammer/comments/psf4n/2162012_challenge_8_difficult/

// Challenge:
// Write a program that will take coordinates, and tell you the corresponding number in pascals triangle. For example:
// Input: 1, 1
// output:1
// input: 4, 2
// output: 3
// input: 1, 19
// output: error/nonexistent/whatever
// the format should be "line number, integer number"
// for extra credit, add a function to simply print the triangle, for the extra credit to count, it must print at least 15 lines.

// Ideas:
// Serpinsky's triangle display (Pascal's Triangle % 2)
// Hover over spot in display to see real value, as it's
// difficult to display the full number in a triangle form

// Notes:
// I had to do some research on this one...
// Basically its this:
//       1
//      1 1
//     1 2 1
//    1 3 3 1
//   1 4 6 4 1 ...etc
// A number is defined by it's two upper neighbors added together,
// assuming there's 0's going on forever outside the triangle.
//
// To be honest I am surprised at myself that I got this one working
// so quickly. From when I started researching to when I got the triangle 
// generating as a 2D array, was about 40 mins. While it's not the most efficient way
// to calculate a specific member of the triangle, (Max safe int in 1-3ms so whatever) 
// it was the method that was the most physical and clearly represented that I could think of. 
// It is generated how a human would go about it, by referencing the previous row's
// values to get the child value. This way the lookup portion of the challenge is as
// easy as accessing a 2D array (starting from 0th index, prompt wants to start at the 1st):

// This is the clean function, without any safeguards or
// special displaying capabilities. It creates a 2D array where the outer
// array is the triangle, and each inner array is a row of increasing size
function pascalsTriangle(rows=57) {
    // Create the outer array
    const tri = []
    // For the specified number of rows...
    for (let i = 1; i <= rows; i++) {
        // Create a new row
        const curRow = []
        // Add the leftmost 1 to it
        curRow.push(1)
        // Locate the previous row
        const prevRow = tri[tri.length-1]
        // For one more than the previous row length...
        for (let j = 1; j < i; j++) {
            // Add the sum of the 2 values above the current one to the current row
            curRow.push((prevRow[j-1] || 0) + (prevRow[j] || 0))
        }
        // Add the new row to the triangle
        tri.push(curRow)
    }
    return tri
}

// This version stops before JavaScript's numbers
// lose precision (57 rows)
function safePascalsTriangle(rows=57) {
    const tri = []
    let stop = false
    for (let i = 1; i <= rows; i++) {
        const curRow = []
        curRow.push(1)
        const prevRow = tri[tri.length-1]
        for (let j = 1; j < i; j++) {
            const num = (prevRow[j-1] || 0) + (prevRow[j] || 0)
            if (num > Number.MAX_SAFE_INTEGER) {
                stop = true
                break
            }
            curRow.push(num)
        }
        if (stop) return tri
        tri.push(curRow)
    }
    return tri
}

function displayTriangle(tri) {
    const container = document.querySelector('.triangle'),
        scale = 26,
        center = (() => {
            let largerThanWindow = (tri[tri.length-1].length * scale),
                smallerThanWindow = window.innerWidth,
                choice = largerThanWindow > smallerThanWindow ? largerThanWindow : smallerThanWindow
            container.style.width = choice + 'px'
            return choice/2
        })()
    tri.forEach((row, rowIdx) => row.forEach((num,numIdx) => {
        const div = document.createElement('div'),
            p = document.createElement('p')
        if (num > 1000) {
            p.textContent = '⋯'
            div.classList.add('hover')
        } else {
            p.textContent = num
        }
        if (num % 2 === 0) div.classList.add('even')
        div.dataset.number = num
        div.classList.add('triangle-member')
        div.appendChild(p)
        const offsetIdx = (row.length/2)-numIdx
        div.style.left = (center - (offsetIdx * scale)) + 'px'
        div.style.top = rowIdx * (scale-3) + 'px'
        container.appendChild(div)
    }))
    const hoverDisp = document.querySelector('.display')
    document.querySelectorAll('.hover').forEach(elt => {
        elt.addEventListener('mousemove', function(e) {
            hoverDisp.textContent = this.dataset.number
            let offset = 20, yOff = 0
            if (e.clientY > window.innerHeight-50) {
                yOff = -50
            }
            hoverDisp.style.left = (e.clientX + offset + window.scrollX) + 'px'
            hoverDisp.style.top = (e.clientY + offset + yOff + window.scrollY) + 'px'
        })
        elt.addEventListener('mouseover', () => {
            hoverDisp.style.opacity = 1
        })
        elt.addEventListener('mouseout', () => {
            hoverDisp.style.opacity = 0
        })
    })
    const rowElt = document.querySelector('.row'),
        columnElt = document.querySelector('.column')
    document.querySelector('.get-value').addEventListener('click', function(e) {
        const row = fullTriangle[rowElt.value]
        let column
        if (row) {
            column = row[columnElt.value]
            if (column) {
                hoverDisp.textContent = column
            } else {
                hoverDisp.textContent = 'Invalid'
            }
        } else {
            hoverDisp.textContent = 'Invalid'
        }
        hoverDisp.style.left = this.offsetLeft + 100 + 'px'
        hoverDisp.style.top = this.offsetTop - 5 + 'px'
        hoverDisp.style.opacity = 1
    })
}

const safeTriangle = safePascalsTriangle(32),
    fullTriangle = safePascalsTriangle()
displayTriangle(safeTriangle)