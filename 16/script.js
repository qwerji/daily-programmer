// r/dailyprogrammer intermediate challenge #15
// https://www.reddit.com/r/dailyprogrammer/comments/q4bk1/2242012_challenge_15_intermediate/

// Challenge:
// A 30x30 grid of squares contains 900 fleas, initially one flea per square. 
// When a bell is rung, each flea jumps to an adjacent square at random 
// (usually 4 possibilities, except for fleas on the edge of the grid or at the corners).
// What is the expected number of unoccupied squares after 50 rings of the bell? 
// Give your answer rounded to six decimal places.

// Notes:
// I decided to (once again) take a very literal approach to the problem, putting the fleas
// on a carpet, as the math based solution is not one that comes naturally to me. 
// I also decided to allow the fleas to move diagonally instead of just up, right, down or left.

function runTest(gridsize=30, bellrings=50) {
    // Setup
    const carpet = []
    for (let i = 0; i < gridsize; i++) {
        carpet[i] = []
        const square = carpet[i]
        for (let j = 0; j < gridsize; j++) {
            square[j] = ['flea']
        }
    }

    for (let h = 0; h < bellrings; h++) { // Ring bell
        for (let i = 0; i < carpet.length; i++) { // Each row: [ [ [], [],...    ],...   ]
            const row = carpet[i]
            for (let j = 0; j < row.length; j++) { // Each square: [ [], [], [],... ]
                const square = row[j]
                for (let k = square.length-1; k >= 0; k--) { // Each square's fleas: ['flea',...]
                    const options = []
                    for (let l = -1; l <= 1; l++) { // Create array of potential flea destinations
                        for (let m = -1; m <= 1; m++) {
                            if (carpet[i+l] && carpet[i+l][j+m] && !(l === 0 && m === 0)) {
                                options.push(carpet[i+l][j+m])
                            }
                        }
                    }
                    options[randomInt(0, options.length-1)].push(square.pop()) // Flea moves to new destination
                }
            }
        }
    }
    return carpet
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function findEmpties(carpet) {
    let count = 0
    for (let i = 0; i < carpet.length; i++) {
        for (let j = 0; j < carpet[i].length; j++) {
            if (!carpet[i][j].length) {
                count++
            }
        }
    }
    return count
}

function avg(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum / arr.length
}

function fleas(gridsize=30, bellrings=50) {
    const counts = []
    for (let i = 0; i < 100; i++) {
        counts.push(findEmpties(runTest(gridsize, bellrings)))
    }
    const averageCounts = avg(counts)
    return `On average, with a gridsize of ${gridsize*gridsize}, ${averageCounts} (${((averageCounts/(gridsize*gridsize)) * 100).toFixed(2)}%) squares were empty after ${bellrings} bell rings.`
}

const display = document.querySelector('.display')

document.querySelector('.calculate').addEventListener('click', () => {
    display.textContent = 'Calculating...'
    setTimeout(() => {
        display.textContent = fleas()
    }, 10)
})
