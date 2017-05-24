
// PICKER

// --------------------------------------------------
// This is a script that chooses a unique challenge from
// r/dailyprogrammer
// --------------------------------------------------

const challengeContainer = document.querySelector('.challenges'),
    sortElt = document.querySelector('select[name="sort"]'),
    filterElt = document.querySelector('select[name="filter"]'),
    randomButton = document.querySelector('.random'),
    tempChosen = [],
    masterList = []
let localCompleted = []

function createMasterList() {
    Challenges.forEach((challenge,i) => {
        const li = document.createElement('li'),
            p1 = document.createElement('p'),
            a = document.createElement('a'),
            p2 = document.createElement('p'),
            p3 = document.createElement('p'),
            checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        
        p1.textContent = challenge.day_number
        a.textContent = challenge.title
        p2.textContent = challenge.difficulty
        p3.textContent = challenge.date
        a.href = challenge.link
        a.target = "_blank"
        checkbox.addEventListener('click', function(e) {
            if (this.checked) {
                addCompleted(li.dataset.index)
            } else {
                removeCompleted(li.dataset.index)
            }
        })

        if (localCompleted.includes(i)) {
            checkbox.checked = true
        } else {
            checkbox.checked = false
        }

        li.appendChild(checkbox)
        li.appendChild(p1)
        li.appendChild(a)
        li.appendChild(p2)
        li.appendChild(p3)
        li.dataset.index = i

        masterList.push(li)
    })
}

function getRandom() {
    let rand, count = 0
    do {
        rand = randomInt(0,Challenges.length-1)
        count++
    } while ((localCompleted[rand] || tempChosen[rand]) && !(count > 1000))
    tempChosen.push(rand)
    window.open(Challenges[rand].link, '_newtab')
}

function addCompleted(index) {
    let local = localStorage.getItem('completed-challenges')
    if (!local) {
        local = '[]'
    }
    local = JSON.parse(local)
    if (index !== undefined && !local.includes(parseInt(index))) {
        local.push(parseInt(index))
    }
    localStorage.setItem('completed-challenges', JSON.stringify(local))
    localCompleted = local
    sortAndFilter()
}

function removeCompleted(index) {
    let local = localStorage.getItem('completed-challenges')
    if (!local) {
        local = '[]'
    }
    local = JSON.parse(local)
    if (index && local.includes(parseInt(index))) {
        for (let i = 0; i < local.length; i++) {
            if (parseInt(index) === local[i]) {
                local.splice(i,1)
                break
            }
        }
    }
    localStorage.setItem('completed-challenges', JSON.stringify(local))
    localCompleted = local
    sortAndFilter()
}

function sortAndFilter() {
    removeAllChildNodes(challengeContainer)
    let filtered = masterList.filter(filterMethods[filterElt.value || 'all'])
    if (sortElt.value) {
        filtered.sort(sortMethods[sortElt.value])
    }
    filtered.forEach(item => challengeContainer.appendChild(item))
}

const sortMethods = {
    newest: (a,b) => {
        a = Challenges[a.dataset.index]
        b = Challenges[b.dataset.index]
        ad = a.date.split('-')
        bd = b.date.split('-')
        const aDate = new Date(ad[0],ad[1],ad[2]).getTime(),
            bDate = new Date(bd[0],bd[1],bd[2]).getTime()
        if (aDate === bDate) {
            return a.day_number < b.day_number ? 1 : -1
        }
        return aDate < bDate ? 1 : -1
    },
    oldest: (a,b) => {
        a = Challenges[a.dataset.index]
        b = Challenges[b.dataset.index]
        ad = a.date.split('-')
        bd = b.date.split('-')
        const aDate = new Date(ad[0],ad[1],ad[2]).getTime(),
            bDate = new Date(bd[0],bd[1],bd[2]).getTime()
        if (aDate === bDate) {
            return a.day_number < b.day_number ? -1 : 1
        }
        return aDate < bDate ? -1 : 1
    },
    difficult: (a,b) => {
        a = Challenges[a.dataset.index]
        b = Challenges[b.dataset.index]
        const ref = {'easy':0, 'intermediate':1,'hard':2}
        if (ref[a.difficulty.toLowerCase()] > ref[b.difficulty.toLowerCase()]) {
            return -1
        }
        if (ref[a.difficulty.toLowerCase()] <= ref[b.difficulty.toLowerCase()]) {
            return 1
        }
    },
    easy: (a,b) => {
        a = Challenges[a.dataset.index]
        b = Challenges[b.dataset.index]
        const ref = {'easy':0, 'intermediate':1,'hard':2}
        if (ref[a.difficulty.toLowerCase()] > ref[b.difficulty.toLowerCase()]) {
            return 1
        }
        if (ref[a.difficulty.toLowerCase()] <= ref[b.difficulty.toLowerCase()]) {
            return -1
        }
    }
}

const filterMethods = {
    easy: item => {
        item = Challenges[item.dataset.index]
        if (item.difficulty === 'Easy') return true
        return false
    },
    intermediate: item => {
        item = Challenges[item.dataset.index]
        if (item.difficulty === 'Intermediate') return true
        return false
    },
    hard: item => {
        item = Challenges[item.dataset.index]
        if (item.difficulty === 'Hard') return true
        return false
    },
    complete: item => {
        if (localCompleted.includes(parseInt(item.dataset.index))) return true
        return false
    },
    incomplete: item => {
        if (localCompleted.includes(parseInt(item.dataset.index))) return false
        return true
    },
    all: item => true
}

function removeAllChildNodes(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild)
    }
}

function randomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

sortElt.addEventListener('change', sortAndFilter)
filterElt.addEventListener('change', sortAndFilter)
randomButton.addEventListener('click', getRandom)

function resize() {
    challengeContainer.style.height = 
        window.innerHeight - challengeContainer.offsetTop - 2 + 'px'
}

window.addEventListener('resize', resize)
resize()

;(() => {
    let local = localStorage.getItem('completed-challenges')
    if (!local) {
        local = '[]'
    }
    local = JSON.parse(local)
    localStorage.setItem('completed-challenges', JSON.stringify(local))
    localCompleted = local
})()
createMasterList()
sortAndFilter()
