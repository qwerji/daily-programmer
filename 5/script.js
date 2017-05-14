// r/dailyprogrammer intermediate challenge #1
// https://www.reddit.com/r/dailyprogrammer/comments/pihtx/intermediate_challenge_1/

// Challenge:
// create a program that will allow you to enter events organizable by hour. 
// There must be menu options of some form, and you must be able to easily 
// edit, add, and delete events without directly changing the source code.
// (note that by menu i dont necessarily mean gui. as long as you can easily access 
// the different options and receive prompts and instructions telling you how to use 
// the program, it will probably be fine)

// Notes:
// I ended up biting off a bit more than I felt like chewing on this one,
// but the end result, interestingly, is a strict week planner. It doesn't
// even use any JavaScript Date objects. All it does is organize a set of
// HTML elements to properly display/edit/delete events in 1 hour blocks.
// Without trying to incorporate a whole calendar of potential events,
// I'd say I at least fulfill what the prompt is asking. I didn't spend too
// long on the styling either but for these challenges I'm going for more
// of a proof-of-concept.

const calendarElt = document.querySelector('.calendar'),
    week = localStorage.getItem('week')

// Load from localStorage or create new calendar
if (week) {
    calendarElt.innerHTML = week
    const editButtons = document.querySelectorAll('.edit'),
        deleteButtons = document.querySelectorAll('.delete')
    editButtons.forEach(button => button.addEventListener('click', editEvent))
    deleteButtons.forEach(button => button.addEventListener('click', deleteEvent))
} else {
    let toPM = false,
        period = 'am'
    for (let i = 11; i < 24+11; i++) {
        const tr = document.createElement('tr'),
            hourTd = document.createElement('td')
        hourTd.textContent = `${(i%12)+1}${period}`
        tr.appendChild(hourTd)
        if (i === 22) period = 'pm'
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td')
            td.classList.add('hour-block')
            tr.appendChild(td)
        }
        calendarElt.appendChild(tr)
    }
    save()
}

const hourBlocks = document.querySelectorAll('.hour-block')
hourBlocks.forEach(block => block.addEventListener('click', createEvent))

function createEvent(e) {
    if (e.srcElement.localName === 'td' && !e.srcElement.dataset.event) {
        const text = prompt('Create event.')
        if (text) {
            const event = document.createElement('div'),
                p = document.createElement('p'),
                editButton = document.createElement('button'),
                deleteButton = document.createElement('button')

            editButton.textContent = 'Edit'
            deleteButton.textContent = 'Delete'
            editButton.classList.add('edit')
            deleteButton.classList.add('delete')
            editButton.addEventListener('click', editEvent)
            deleteButton.addEventListener('click', deleteEvent)

            p.textContent = text
            event.appendChild(p)
            event.appendChild(editButton)
            event.appendChild(deleteButton)
            e.srcElement.appendChild(event)
            e.srcElement.dataset.event = 'exists'

            save()
        }
    }
}

function editEvent(e) {
    const p = e.srcElement.parentNode.children[0],
        text = prompt('Edit event.', p.textContent)
    if (text) {
        p.textContent = text
        save()
    }
}

function deleteEvent(e) {
    e.srcElement.parentNode.parentNode.dataset.event = ''
    removeElement(e.srcElement.parentNode)
    save()
}

function removeElement(el) {
    el.parentNode.removeChild(el)
}

function save() {
    localStorage.setItem('week', calendarElt.innerHTML)
}
