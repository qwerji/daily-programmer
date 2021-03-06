// r/dailyprogrammer intermediate challenge #14
// https://www.reddit.com/r/dailyprogrammer/comments/q2mwu/2232012_challenge_14_intermediate/

// Challenge:
// Your task is to implement the sieve of Sundaram and calculate the list of primes to 10000.

// Notes:
// So to my understanding, here are the steps:
// Create an array of numbers of n length, starting from 4, each being 3 steps apart.
// [4, 7, 10, 13...]
// Once n is reached, append the sequence of numbers starting from the next number in the first
// sequence. So the first number of each sequence after the first sequence will come
// from the first sequence. The interval of each sequence will be the interval of the 
// last sequence + 2.
// Then look at every number that is not in the array, multiply it by two, and add 1.
// This should give you a list of primes to n, excluding the first prime, 2.

function sundaramsSieve(n=52365) {
    console.log('Start')
    console.log('Generating sequence')
    let sequence = [],
        step = 3
    for (let i = 4; i <= n; i += step) { // Create the initial sequence
        sequence.push(i)
    }
    console.log('Creating hash')
    const hash = {} // Using an object for faster lookup time
    sequence.forEach(num => hash[num] = true)
    for (let i = 1; i < n; i++) { // Create the other sequences starting at initial[i]
        const start = sequence[i]
        step+=2 // Increment the step amount each sequence
        for (let j = start; j <= n; j += step) {
            hash[j] = true
        }
    }
    console.log('Finding primes')
    const primes = []
    for (let i = 1; i < n; i++) {
        if (!hash[i]) { // If i is not in the sequence, i2 + 1 is prime
            primes.push((i*2)+1)
        }
    }
    return [2, ...primes] // Add the missing first prime and return
}

// Test
let prime = true
const maybePrimes = sundaramsSieve(),
    notPrimes = []
console.log('Testing...')
maybePrimes.forEach(num => {
    if (!isPrime(num)) {
        notPrimes.push(num)
        prime = false
    }
})
console.log('Done')
if (prime) {
    console.log(maybePrimes)
    console.log('All are primes!')
} else {
    console.log(maybePrimes)
    console.log('Not all are primes: ')
    console.log(notPrimes)
}

function isPrime(n) {
    if (n === 1) {
        return false
    } else if (n === 2) {
        return true
    }
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false
        }
    }
    return true
}