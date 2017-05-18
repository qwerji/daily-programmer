// r/dailyprogrammer easy challenge #6
// https://www.reddit.com/r/dailyprogrammer/comments/pp53w/2142012_challenge_6_easy/

// Challenge:
// Your challenge for today is to create a program that can 
// calculate pi accurately to at least 30 decimal places.
// Try not to cheat :)

// Notes:
// Going off of a standupmaths video about calculating 𝜋 by hand,
// I'll be using the Leibniz inifinite series. Alternately subtract and
// add all of the odd fractions (1/1 - 1/3 + 1/5 - 1/7...), you get 𝜋/4!
// However, this converges on 𝜋 pretty slowly, so it's a lot of 
// computation for a not very accurate outcome, but it's an easier
// infinite series to understand than the more accurate, faster ones.
// The failsafe is an arbitrary value that stops the number of iterations so
// your browser doesn't take forever. If it gets too large, it could take
// a very long time, 9 zeroes took about a 2 minutes for me.
// This technically fails the challenge, but JavaScripts floats only go
// to 17 decimal places, and apparently the computation can be innacurate.
// So if anything, this is just a browser stress test... oh well.

const display = document.querySelector('.display'),
    failsafeElt = document.querySelector('.failsafe')

document.querySelector('.go').addEventListener('click', () => {
    let pi = 0,
        odds = 1,
        add = false,
        failsafe = parseInt(failsafeElt.value) || 10000000

    display.textContent = 
        `Calculating 𝜋...
This may cause your browser to freeze for a bit.`

    setTimeout(() => {
        const startTime = Date.now()

        while (Math.abs(pi*4) != Math.PI && odds/2 < failsafe ) {
            add ? pi += 1/odds : pi -= 1/odds
            add = !add
            odds += 2
        }

        pi = Math.abs(pi*4)
        
        display.textContent = 
            `calculated 𝜋 = ${pi}
   Math.PI 𝜋 = ${Math.PI}

Took ${((Date.now() - startTime)/1000).toFixed(2)}s to calculate.`
    console.log(`Stopped by failsafe?: ${!(odds < failsafe)}`)
    },10)
})

console.log()