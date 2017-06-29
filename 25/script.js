// r/dailyprogrammer difficult challenge #122
// https://www.reddit.com/r/dailyprogrammer/comments/137f7h/11142012_challenge_112_difficultwhat_a_brainf/

// Challenge:
// Your goal is to write a BrainFuck interpreter from scratch, and have it support both 
// single-character output to standard-out and single-character input from standard-in.

// Notes:
// I decided to use a doubly linked list for this challenge, as the concept of
// traversing back and forth between cells seems to lend itself to that.
// There are still some programs that I am not sure this interpreter works with
// and I'm pretty sure it has something to do with integer overflow. Some programs
// actually take advantage of the fact that 255 is closer to 0 by increment. However,
// certain programs are written with the assumption of a certain bit size for integers.
// This one uses 8bit integers, modulo-ing the values by 256.

const brainfuckInterpreter = (() => {

    function Cell() {
        this.value = 0
        this.next = null
        this.prev = null
        cellCount++
    }

    Cell.prototype['>'] = function() {
        if (o.debug) console.log('Forwards')
        if(!this.next) {
            if (o.debug) console.log('Adding New Cell')
            this.next = new Cell()
            this.next.prev = this
        }
        return this.next
    }
    Cell.prototype['<'] = function() {
        if (o.debug) console.log('Backwards')
        if(!this.prev) {
            if (o.debug) console.log('Adding New Cell')
            this.prev = new Cell()
            this.prev.next = this
        }
        return this.prev
    }
    Cell.prototype['+'] = function() {
        if (o.debug) console.log('Increment')
        this.value = (this.value + 1) % 256
        return this
    }
    Cell.prototype['-'] = function() {
        if (o.debug) console.log('Decrement')
        this.value = (this.value - 1) % 256 
        return this
    }
    Cell.prototype[','] = function(input) {
        this.value = input.text.charCodeAt(input.i++) || 0
        if (o.debug) console.log('Value from input:', input.text[input.i-1], ': ', this.value)
        return this
    }
    Cell.prototype['.'] = function() {
        if (o.debug) console.log('Printing ASCII')
        print += String.fromCharCode(this.value)
        return this
    }

    function Loop(start) {
        this.start = start
        this.end = null
    }

    let print = '', cellCount = 0, o = {}

    function brainfuck(code='', input='') {
        print = ''
        cellCount = 0
        let loops = [], currentCell = new Cell(), time = Date.now()
        input = { i: 0, text: input }
        for (let i = 0; i < code.length; i++) {
            const char = code[i]
            if (o.debug) console.log(`----- New Character: "${char}" at col`, i, '-----')
            if (currentCell[char]) {
                currentCell = currentCell[char](input)
            } else if (char === '[') {
                if (o.debug) console.log('- Start of loop -')
                const loop = loops.find(loop => loop.start === i)
                if (currentCell.value <= 0 && loop) {
                    if (o.debug) console.log('Loop is complete, jumping to end')
                    i = loops.pop().end
                } else if (!loop) {
                    if (o.debug) console.log('Creating new loop')
                    loops.push(new Loop(i))
                } else {
                    if (o.debug) console.log('Continuing existing loop')
                }
            } else if (char === ']') {
                if (o.debug) console.log('- End of loop -')
                const lastLoop = loops[loops.length-1]
                if (lastLoop.end === null) {
                    if (o.debug) console.log('Setting loop end value')
                    lastLoop.end = i
                }
                if (currentCell.value <= 0) {
                    if (o.debug) console.log('Loop is complete, moving on')
                    i = loops.pop().end
                } else {
                    if (o.debug) console.log('Loop continuing back to beginning')
                    i = lastLoop.start
                }
            } else {
                if (o.debug) console.log('Invalid character')
            }
        }
        if (code.includes('.')) console.log(print)
        if (o.results) console.log(`Done with ${cellCount} cells in ${Date.now() - time}ms`)
        return print
    }

    return (code,input,options) => {
        if (options) o = options || {}
        return brainfuck(code,input)
    }

})()

const input = document.querySelector('.input'),
    code = document.querySelector('.code'),
    runButton = document.querySelector('.run'),
    print = document.querySelector('.print')

code.value = '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.'

runButton.addEventListener('click', () => {
    print.value = brainfuckInterpreter(code.value, input.value, { results: true })
})
