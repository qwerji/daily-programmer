// r/dailyprogrammer challenge #1
// https://www.reddit.com/r/dailyprogrammer/comments/pih8x/easy_challenge_1/

// Challenge:
// create a program that will ask the users name, age, and reddit username. 
// have it tell them the information back, in the format:
// your name is (blank), you are (blank) years old, and your username is (blank)
// for extra credit, have the program log this information in a file to be accessed later.

// Notes:
// This is a little convoluted, but when it comes to making something
// scaleable or at least useable as a module somewhere else, sometimes I 
// just can't help myself. With a little tweaking this could be made into
// a constructor function with a nice init for passing things in.
// Instead of writing to a file, I am saving the user's data in local storage.

const prompt = document.querySelector('.prompt'),
    form = document.querySelector('form'),
    local = localStorage.getItem('info'),
    prompts = [
        {
            response: '',
            text: 'Please enter your name.',
            display: ['Your name is ', null, '. ']
        },
        {
            response: '',
            text: 'Please enter your age.',
            display: ['Your are ', null, ' years old, ']
        },
        {
            response: '',
            text: 'Please enter your reddit username.',
            display: ['and your username is ', null, '.']
        }
    ]

let promptIdx = 0, displayed = false, started = false

function nextPrompt() {
    if (promptIdx >= prompts.length) {
        displayInfo()
    } else {
        prompt.textContent = prompts[promptIdx].text
    }
}

function displayInfo() {
    let str = ''
    for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i]
        for (let j = 0; j < prompt.display.length; j++) {
            if (prompt.display[j] === null) {
                str += prompt.response
            } else {
                str += prompt.display[j]
            }
        }
    }
    prompt.textContent = str
    localStorage.setItem('info', str)
    displayed = true
    started = false
}

form.addEventListener('submit', function(e) {
    e.preventDefault()
    if (local && local.length > 0 && !started) {
        started = true
        promptIdx = 0
        nextPrompt()
        this.reset()
    }
    const input = this.querySelector('input')
    if (input.value !== '' && !displayed) {
        prompts[promptIdx].response = input.value
        this.reset()
        promptIdx++
        started = true
        nextPrompt()
    }
})

nextPrompt()

if (local && local.length > 0) {
    prompt.textContent = local
}
