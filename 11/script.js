// r/dailyprogrammer easy challenge #8
// https://www.reddit.com/r/dailyprogrammer/comments/pserp/2162012_challenge_8_easy/

// Challenge:
// write a program that will print the song "99 bottles of beer on the wall".

function singSong() {
    let emptyBottleRequestCount = 0
    const initialContainerCount = 99,
        units = () => `bottle${containerCount === 1 ? '' : 's'} of beer`,
        count = () => {
            if (containerCount === 0) {
                emptyBottleRequestCount++
                if (emptyBottleRequestCount === 2) {
                    return 'No more'
                }
                return 'no more'
            }
            return containerCount
        },
        action = () => {
            if (containerCount === 0) {
                containerCount = initialContainerCount 
                return 'Go to the store, buy some more'
            }
            containerCount--
            return 'Take one down, pass it around'
        }

    let containerCount = initialContainerCount
    while (containerCount >= -1) {
        const c = count(), u = units()
        printLyric(
            `${c} ${u} on the wall, ${c} ${u}! ${action()}, ${count()} ${units()} on the wall!`
        )
        if (containerCount === initialContainerCount) break
    }
}
singSong()

function printLyric(lyric) {
    const p = document.createElement('p')
    p.textContent = lyric
    document.body.appendChild(p)
}