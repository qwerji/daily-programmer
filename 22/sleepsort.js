// r/dailyprogrammer easy challenge #91
// https://www.reddit.com/r/dailyprogrammer/comments/yqydh/8242012_challenge_91_easy_sleep_sort/

// Challenge:
// Your task is to re-implement sleep sort in a language of your choice (which might look trivial,
// but this challenge is all about learning how your language handles multithreading.)

// Notes:
// This challenge was certainly eye-opening into how JavaScript actually implements setTimeout.
// I am not totally solid on how it works behind the scenes, but the fact that Node and Chrome
// behaved quite differently is really interesting. The comments below in the code outline my
// observations.

function sleepsort() {
    // Create the arguments array (to get forEach)
    const args = [...arguments],
    // New array to be returned, sorted
        newArr = []
    // Variable to store promise callback
    let callback
    // Loop
    args.forEach(arg => {
        // Create a setTimeout for each, which is set to be called according
        // to the value of each argument respectively
        setTimeout(n => {
            // Add the number to the new array
            newArr.push(n)
            // Run the callback once the new array is the same length
            // as the arguments array
            if (newArr.length === args.length) callback(newArr)
        }, arg, arg)
        //  ^  In the context of node, the way I got the arguments to
        // be added at the correct time was to multiply it by 2. If the raw
        // argument is used, interestingly, the resulting array is not sorted.
        // This must have something to do with the proximity of the timeouts being
        // called, node's event queue, and potentially my computer?
    })
    // return the promise
    return {
        then: cb => callback = cb
    }
}

sleepsort(20, 300, 10, 40, 9, 0).then(console.log)
