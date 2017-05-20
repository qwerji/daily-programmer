// r/dailyprogrammer easy challenge #8
// https://www.reddit.com/r/dailyprogrammer/comments/pserp/2162012_challenge_8_easy/

// Challenge:
// write a program that will print the song "99 bottles of beer on the wall".
// for extra credit, do not allow the program to print each loop on a new line. (I ignored this)

function singSong() {
    let containerCount = 99
    const containerType = 'snifter',
        beverage = 'rustic, local saison',
        units = () => `${containerType}${containerCount === 1 ? '' : 's'} of ${beverage}`,
        getCount = () => containerCount === 0 ? 'no more' : containerCount
        
    console.group('Song')
    while (containerCount > 0) {
        let lyric = `${getCount()} ${units()} on the wall, ${getCount()} ${units()}! Take one down, pass it around, `
        containerCount--
        lyric += `${getCount()} ${units()} on the wall!`
        console.log(lyric)
    }
    console.groupEnd('Song')
}
singSong()