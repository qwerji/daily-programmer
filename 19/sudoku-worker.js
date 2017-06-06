function solveSudoku(puzzle) {
    const open = getOpenIdx(puzzle)
    if (!open) return 1
    const potentials = getPotentials(puzzle,open[0],open[1])
    for (let num in potentials) {
        num = parseInt(num)
        if (potentials[num]) {
            puzzle[open[0]][open[1]] = num
            if (solveSudoku(puzzle)) return 1
        }
    }
    puzzle[open[0]][open[1]] = 0
    return 0
}

function getOpenIdx(puzzle) {
    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[i].length; j++) {
            if (!puzzle[i][j]) {
                return [i,j]
            }
        }
    }
    return null
}

function getPotentials(puzzle, rowIdx, colIdx) {
    const potentials = {
        1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true
    }
    for (let i = 0; i < puzzle[rowIdx].length; i++) {
        const num = puzzle[rowIdx][i]
        if (potentials[num]) {
            potentials[num] = false
        }
    }
    for (let i = 0; i < puzzle.length; i++) {
        const num = puzzle[i][colIdx]
        if (potentials[num]) {
            potentials[num] = false
        }
    }
    let newRow = rowIdx
    while (newRow !== 0 && newRow !== 3 && newRow !== 6) {
        newRow--
    }
    let newCol = colIdx
    while (newCol !== 0 && newCol !== 3 && newCol !== 6) {
        newCol--
    }
    for (let i = newRow; i < newRow+3; i++) {
        for (let j = newCol; j < newCol+3; j++) {
            const num = puzzle[i][j]
            if (potentials[num]) {
                potentials[num] = false
            }
        }
    }
    return potentials
}

self.addEventListener('message', e => {
    const puzzle = e.data.puzzle
    let then = Date.now()
    solveSudoku(puzzle)
    let time = Date.now()-then
    self.postMessage({puzzle,time})
})