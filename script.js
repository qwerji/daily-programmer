const challengesElt = document.querySelector('.challenges'),
    challenges = [
        {
            title: 'Information Prompt',
            href: '/1',
            imgSrc: './images/1.svg'
        },
        {
            title: 'Interest Calculator',
            href: '/2',
            imgSrc: './images/2.svg'
        },
        {
            title: 'Text-Based Adventure',
            href: '/3',
            imgSrc: './images/3.svg'
        },
        {
            title: 'Number Guesser',
            href: '/4',
            imgSrc: './images/4.svg'
        },
        {
            title: 'Week Planner',
            href: '/5',
            imgSrc: './images/5.svg'
        },
        {
            title: 'Stopwatch',
            href: '/6',
            imgSrc: './images/6.svg'
        },
        {
            title: 'Caesar Cipher',
            href: '/7',
            imgSrc: './images/7.svg'
        },
        {
            title: 'Password Generator',
            href: '/8',
            imgSrc: './images/8.svg'
        },
        {
            title: 'Calculating 𝜋',
            href: '/9',
            imgSrc: './images/9.svg'
        },
        {
            title: 'Morse Code Translator',
            href: '/10',
            imgSrc: './images/10.svg'
        },
        {
            title: 'Beverage Song',
            href: '/11',
            imgSrc: './images/11.svg'
        },
        {
            title: 'Integer/English Translator',
            href: '/12',
            imgSrc: './images/12.svg'
        },
        {
            title: "Pascal/Sierpinski's Triangle",
            href: '/13',
            imgSrc: './images/13.svg'
        },
        {
            title: "Hangman",
            href: '/14',
            imgSrc: './images/14.svg'
        },
        {
            title: "Sieve of Sundaram",
            href: '/15',
            imgSrc: './images/15.svg'
        },
        {
            title: "Fleas On A Carpet",
            href: '/16',
            imgSrc: './images/16.svg'
        },
        {
            title: "Filter String",
            href: '/17',
            imgSrc: './images/17.svg'
        },
        {
            title: "Phone Number Text Conversion",
            href: '/18',
            imgSrc: './images/18.svg'
        },
        {
            title: "Sudoku Solver",
            href: '/19',
            imgSrc: './images/19.svg'
        },
        {
            title: "Procrastination Deterrent",
            href: '/20',
            imgSrc: './images/20.svg'
        },
        {
            title: "Sleep Sort",
            href: '/22',
            imgSrc: './images/22.svg'
        },
        {
            title: "Look And Say",
            href: '/23',
            imgSrc: './images/23.svg'
        },
        {
            title: "3 Column Display",
            href: '/24',
            imgSrc: './images/24.svg'
        }
    ],
    challengeElts = []

for (let i = challenges.length-1; i >= 0; i--) {
    const challenge = challenges[i],
        li = document.createElement('li'),
        p = document.createElement('p'),
        img = document.createElement('img'),
        a = document.createElement('a')

    p.textContent = challenge.title
    img.src = challenge.imgSrc
    a.href = challenge.href

    li.appendChild(img)
    li.appendChild(p)
    a.appendChild(li)
    challengesElt.appendChild(a)
    challengeElts.push(a)
}

const h1 = document.querySelector('h1'),
    description = document.querySelector('.description')

window.onload = () => {
    let ms = 0, interv = 100
    setTimeout(() => {
        h1.classList.add('fly-in')
    }, ms)
    ms+=interv

    setTimeout(() => {
        description.classList.add('fly-in')
    }, ms)
    ms+=interv

    for (let i = 0; i < challengeElts.length; i++) {
        const element = challengeElts[i]
        setTimeout(() => {
            element.classList.add('fly-in')
        }, ms)
        ms += interv
    }
}

const colors = [
    { // Day
        title: { text: 'black', bg: '#D1EBF8' }, 
        subtitle: { text: 'black', bg: '#bcffb7' },
        links: 'rgba(0,0,100,0.8)'
    },
    { // Night
        title: { text: '#ffffff', bg: '#2b2846' }, 
        subtitle: { text: '#ffffff', bg: '#27241f' },
        links: 'snow'
    }
]

const time = Math.floor((((new Date().getHours() + 20) % 24) / 24) * 8)
document.body.style.backgroundImage = `url(./images/time-backgrounds/${time}.png)`

const color = colors[time > 5 ? 1 : 0]
h1.style.color = color.title.text
h1.style.background = color.title.bg

description.style.color = color.subtitle.text
description.querySelector('span').style.color = color.subtitle.text
description.style.background = color.subtitle.bg

document.querySelectorAll('a').forEach(a => {
    a.style.color = color.links
})
