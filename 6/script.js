// r/dailyprogrammer difficult challenge #2
// https://www.reddit.com/r/dailyprogrammer/comments/pjsdx/difficult_challenge_2/

// Challenge:
// Your mission is to create a stopwatch program. this program should have 
// start, stop, and lap options, and it should write out to a file to be viewed later.

// Notes:
// This challenge was deceptivley difficult, especially since I wanted to avoid the 
// inaccuracy of JavaScript's setInterval by using total elapsed milliseconds instead.
// This is pretty straightforward for the most part, but if the timer is paused and started
// again, an offset amount has to be factored in from the time that it was originally paused.
// Otherwise it will be as if the timer had never stopped, because all of the calculations
// are being made off of the current total elapsed milliseconds.
// As for writing to a file, I'm using localStorage to save the sessions.

const displayElt = document.querySelector('.display'),
    startStopButton = document.querySelector('.start-stop'),
    lapButton = document.querySelector('.lap'),
    resetButton = document.querySelector('.reset'),
    saveButton = document.querySelector('.save'),
    loadButton = document.querySelector('.load'),
    clearButton = document.querySelector('.clear'),
    lapsElt = document.querySelector('.laps'),
    loadedTimesElt = document.querySelector('.loaded-times'),
    title = document.querySelector('title')

let startTime = 0,
    lapTime = 0,
    offset = 0,
    timerStarted = false,
    timer = null,
    currentDate = null,
    laps = []

function tick() {
    currentDate = new Date(Date.now() - startTime - offset)
    displayElt.textContent = formatDate(currentDate)
    title.textContent = formatDate(currentDate, true)
}

startStopButton.addEventListener('click', () => {
    if (timerStarted) {
        clearInterval(timer)
        offset = Date.now()
        timerStarted = false
        startStopButton.textContent = 'Start'
    } else {
        if (startTime <= 0) {
            startTime = lapTime = Date.now()
        } else {
            offset = Date.now() - offset
        }
        timer = setInterval(tick, 1)
        timerStarted = true
        startStopButton.textContent = 'Stop'
    }
})
lapButton.addEventListener('click', () => {
    if (!timerStarted) return
    const now = Date.now(),
        thisLap = new Date(now - lapTime - offset)
    lapTime = now - offset
    const newLapElt = document.createElement('li'),
        timeElt = document.createElement('p')
    timeElt.textContent = formatDate(thisLap)
    newLapElt.appendChild(timeElt)
    lapsElt.appendChild(newLapElt)
    laps.push(thisLap)
})
resetButton.addEventListener('click', () => {
    startTime = lapTime = offset = 0
    laps = []
    clearInterval(timer)
    timerStarted = false
    startStopButton.textContent = 'Start'
    removeAllChildNodes(lapsElt)
    title.textContent = 'qwerji | daily programmer | 6'
    displayElt.textContent = '0:00:00:000'
})
saveButton.addEventListener('click', () => {
    if (startTime <= 0) return
    const currentTimes = getTimes()
    currentTimes.push({
        date: currentDate,
        laps: laps
    })
    localStorage.setItem('times', JSON.stringify(currentTimes))
})
loadButton.addEventListener('click', () => {
    removeAllChildNodes(loadedTimesElt)
    const currentTimes = getTimes(),
        title = document.createElement('h2')
    title.textContent = currentTimes.length ? 'Previous Sessions' : 'No Saved Sessions'
    loadedTimesElt.appendChild(title)
    currentTimes.forEach(session => {
        const sessionElt = document.createElement('div'),
            totalTimeElt = document.createElement('h3'),
            lapListElt = document.createElement('ol'),
            st = new Date(session.date)
        totalTimeElt.textContent = formatDate(st)
        sessionElt.appendChild(totalTimeElt)
        session.laps.forEach(lap => {
            const lt = new Date(lap),
                loadedLapElt = document.createElement('li')
            loadedLapElt.textContent = formatDate(lt)
            lapListElt.appendChild(loadedLapElt)
        })
        sessionElt.appendChild(lapListElt)
        loadedTimesElt.appendChild(sessionElt)
    })
})
clearButton.addEventListener('click', () => {
    removeAllChildNodes(loadedTimesElt)
    localStorage.setItem('times', JSON.stringify([]))
})

function getTimes() {
    let currentTimes = localStorage.getItem('times')
    if (currentTimes) {
        return JSON.parse(currentTimes)
    } else {
        return []
    }
}

function removeAllChildNodes(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

function formatDate(date, short=false) {
    let formatted = `${date.getHours() - 16}:${
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
    if (!short) {
        formatted += 
            `:${date.getMilliseconds() < 100 ? 
                (date.getMilliseconds() < 10 ? `00${date.getMilliseconds()}` : `0${date.getMilliseconds()}`) :
                date.getMilliseconds()}`
    }
    return formatted
}
