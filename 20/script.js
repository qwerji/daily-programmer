// r/dailyprogrammer difficult challenge #20
// https://www.reddit.com/r/dailyprogrammer/comments/qnl1d/382012_challenge_20_difficult/

// Challenge:
// create a program that will remind you to stop procrastinating every two hours with a pop up message!

// Notes:
// This could be done extremely simply and in a "code golf" sort of way like this:
// setInterval(() => alert('Get back to work!'),7200000)
// But that's not as nice looking, and alerts are kind of annoying.
// So I did what seemed the most like it would get your attention even if you
// weren't focused on that tab. Change the tab title text and play a sound.
// I was going to make the title animate with clock face emojis but apparently
// they don't work with chrome tab titles :(

const title = document.querySelector('title'),
    stopButton = document.querySelector('.stop'),
    sound = new Audio('./alert.wav')

sound.loop = true
sound.volume = 0.3

let timer,
    blinker,
    ticker,
    on = true,
    tickerIdx = 0,
    startTime = 0

function procrastinationDeterrent() {
    sound.play()
    clearInterval(ticker)
    clearInterval(blinker)
    stopButton.style.transform = 'translateY(0)'
    blinker = setInterval(() => {
        if (on) {
            stopButton.classList.add('flash')
            title.textContent = '** Get back to work! ***'
        } else {
            stopButton.classList.remove('flash')
            title.textContent = '*** Get back to work! **'
        }
        on = !on
    },500)
}

function stop() {
    startTime = Date.now()
    sound.pause()
    sound.currentTime = 0
    stopButton.classList.remove('flash')
    stopButton.style.transform = `translateY(-${innerHeight}px)`
    clearInterval(ticker)
    clearInterval(blinker)
    ticker = setInterval(() => {
        title.textContent = clockFaces[tickerIdx]
        tickerIdx = (tickerIdx + 1) % clockFaces.length
        if (Date.now() - startTime >= 7200000) {
            procrastinationDeterrent()
        }
    }, 500)
}

document.querySelector('.trigger').addEventListener('click', procrastinationDeterrent)
document.querySelector('.stop').addEventListener('click', stop)

stop()
