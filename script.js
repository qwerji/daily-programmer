const challengesElt = document.querySelector('.challenges'),
    challenges = [
        {
            title: 'Information Prompt',
            href: '/1',
            imgSrc: './images/1.svg'
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
    h1.classList.add('fly-in')
    description.classList.add('fly-in')
    let ms = 0
    for (let i = 0; i < challengeElts.length; i++) {
        const element = challengeElts[i]
        setTimeout(() => {
            element.classList.add('fly-in')
        }, ms)
        ms += 200
    }
}
