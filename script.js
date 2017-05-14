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
        }
    ],
    challengeElts = []

for (let i = 0; i < challenges.length; i++) {
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
