const Sudoku = (() => {

    const public = {}

    // Solves in place (original arrays are altered)
    function solveSudoku(puzzle) {
        // Find an open square
        const open = getOpenIdx(puzzle)
        // If there are none, return 1, solved!
        if (!open) return 1
        // Otherwise find all the possible numbers for that square
        const potentials = getPotentials(puzzle,open[0],open[1])
        // Loop over them
        for (let num in potentials) {
            num = parseInt(num)
            if (potentials[num]) {
                // Try out each number in this slot
                puzzle[open[0]][open[1]] = num
                // Recurse on the puzzle with the given number
                if (solveSudoku(puzzle)) return 1
            }
        }
        // None of the numbers were valid, reset the number to zero
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
        // Row
        for (let i = 0; i < puzzle[rowIdx].length; i++) {
            const num = puzzle[rowIdx][i]
            if (potentials[num]) {
                potentials[num] = false
            }
        }
        // Col
        for (let i = 0; i < puzzle.length; i++) {
            const num = puzzle[i][colIdx]
            if (potentials[num]) {
                potentials[num] = false
            }
        }
        // Find the upper left corner of the box
        let newRow = rowIdx
        while (newRow !== 0 && newRow !== 3 && newRow !== 6) {
            newRow--
        }
        let newCol = colIdx
        while (newCol !== 0 && newCol !== 3 && newCol !== 6) {
            newCol--
        }
        // Box
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
    
    // Check for web worker support!
    if (typeof(Worker) !== "undefined") {
        public.solve = puzzle => {
            let worker = new Worker("./sudoku-worker.js")
            worker.addEventListener('message', e => {
                public.onSolve(e.data.puzzle, e.data.time)
            })
            worker.postMessage({puzzle})
        }
    } else {
        // Solve synchronously
        public.solve = puzzle => {
            let then = Date.now()
            solveSudoku(puzzle)
            public.onSolve(puzzle, Date.now()-then)
        }
    }

    public.onSolve = (solved, time) => console.log(solved)

    public.isValid = puzzle => {
        for (let i = 0; i < puzzle.length; i++) {
            // Rows
            const inThisRow = [], row = puzzle[i]
            for (let j = 0; j < row.length; j++) {
                if (inThisRow.includes(row[j]) && row[j] !== 0) return false
                inThisRow.push(row[j])
            }
            // Columns
            const inThisCol = []
            for (let k = 0; k < puzzle.length; k++) {
                if (inThisCol.includes(puzzle[k][i]) && puzzle[k][i] !== 0) return false
                inThisCol.push(puzzle[k][i])
            }
        }
        // Boxes
        for (let i = 0; i < puzzle.length; i += 3) {        // Each
            for (let j = 0; j < puzzle[i].length; j += 3) { // Box
                const inThisBox = []
                for (let k = i; k < i+3; k++) {     // Each box's
                    for (let l = j; l < j+3; l++) { // members
                        if (inThisBox.includes(puzzle[k][l]) && puzzle[k][l] !== 0) return false
                        inThisBox.push(puzzle[k][l])
                    }
                }
            }
        }
        return true
    }

    return public

})()
