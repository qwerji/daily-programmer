function sundaramsSieveDisplay(n=100) {
    let sequence = [],
        step = 3,
        allElements = document.querySelector('.grid'),
        primeElements = document.querySelector('.primes')
    for (let i = 1; i <= n; i++) {
        addP(allElements, i)
    }
    for (let i = 4; i <= n; i += step) {
        sequence.push(i)
        allElements.childNodes[i-1].classList.add('sequence')
    }
    const hash = {}
    sequence.forEach(num => hash[num] = true)
    for (let i = 1; i < n; i++) {
        const start = sequence[i]
        step += 2
        for (let j = start; j <= n; j += step) {
            hash[j] = true
            allElements.childNodes[j-1].classList.add('sequence')
        }
    }
    const primes = []
    for (let i = 1; i < n; i++) {
        if (!hash[i]) {
            const prime = (i*2)+1
            primes.push(prime)
            allElements.childNodes[i-1].classList.add('missing')
            addP(primeElements, prime)
        }
    }
    return [2, ...primes]
}

function addP(parent, i) {
    const p = document.createElement('p')
    p.textContent = i
    parent.appendChild(p)
}

sundaramsSieveDisplay()