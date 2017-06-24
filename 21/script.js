// r/dailyprogrammer intermediate challenge #249
// https://www.reddit.com/r/dailyprogrammer/comments/40rs67/20160113_challenge_249_intermediate_hello_world/

// Challenge:
// Use either an Evolutionary or Genetic Algorithm to evolve a solution to the fitness functions provided!

// Notes:
// Using some concepts from a Coding Train on genetic algorithms.

const seed = 'abcdefghijklmnopqrstuvwxyz',
    genePool = [],
    poolSize = 20

let input = 'hello world'
let stop = true

// Initial Setup
for (let i = 0; i < poolSize; i++) {
    genePool.push(new Candidate())
}

function loop() {

    genePool.forEach(cand => cand.calcFitness())

    const newGenePool = []
    genePool.forEach(() => {
        const cand1 = pickCandidate(),
            cand2 = pickCandidate(cand1),
            child = cand1.crossover(cand2)
        newGenePool.push(child)
    })

    if (!stop) requestAnimationFrame(loop)
}
// loop()

function Candidate() {
    this.dna = ''
    for (let i = 0; i < input.length; i++) {
        this.dna += getRandomChar()
    }
    this.fitness = 0
}

Candidate.prototype.calcFitness = function() {
    let fitness = 0
    for (let i = 0; i < input.length; i++) {
        if (input[i] === this.dna[i]) {
            fitness++
        }
    }
    fitness /= input.length
    this.fitness = fitness
}

Candidate.prototype.crossover = function(that) {
    const thisfitness = this.fitness*100,
        thatfitness = that.fitness*100,
        total = thisfitness + thatfitness
    console.log(total)
    for (let i = 0; i < input.length; i++) {
        const gene1 = this.dna[i], gene2 = that.dna[i]
    }
}

function pickCandidate(cand1) {
    let cand2
    do {
        // cand2 = genePool[random]
    } while (cand1 === cand2)
}

function getRandomChar() {
    return seed[randomInt(0,seed.length-1)]
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}