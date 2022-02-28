/* Modals */

const openModals = document.querySelectorAll('#open-modal')

console.log(openModals)

openModals.forEach(item => {
    item.addEventListener('click', Event => {
        Event.preventDefault()
        const itemModal = document.querySelector(`.${item.getAttribute('href').substring(1)}`)
        itemModal.classList.add('active')
    })
})

const modalBg = document.querySelectorAll('.modal__bg')

modalBg.forEach(item => {
    item.addEventListener('click', Event => {
        if (Event.target.id === 'close-modal') item.classList.remove('active')
    })
})

/* Header Fixed */

const header = document.querySelector('.header')

window.addEventListener('scroll', fixHeader)

function fixHeader() {
    let scrollPos = window.scrollY

    if (scrollPos > 0) {
        header.classList.add('fixed')
    } else {
        header.classList.remove('fixed')
    }
}

fixHeader()

/* Burger */

const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav')

// window.addEventListener('click', Event => {
//     console.log(Event.target.classList.value)
//     if (Event.target.classList.value === 'burger' || Event.target.classList.value === 'burger__span' || Event.target.classList.value === 'burger active') {
//         nav.classList.toggle('open')
//         burger.classList.toggle('active')
//     }
// })

burger.addEventListener('click', () => {
    nav.classList.toggle('open')
    burger.classList.toggle('active')
})

window.addEventListener('scroll', () => {
    nav.classList.remove('open')
    burger.classList.remove('active')
})

/* Smooth Scroll */

const navLinks = document.querySelectorAll('.nav__link')
const headerHeight = header.clientHeight + 20

navLinks.forEach(item => {
    item.addEventListener('click', Event => {
        Event.preventDefault()
        const target = document.querySelector(`${item.getAttribute('href')}`)

        window.scrollBy({
            top: scrollTop(target),
            behavior: 'smooth'
        })
    })
})

function scrollTop(target) {
    return target.getBoundingClientRect().top - headerHeight
}

/* Intro Scroll */

const introButton = document.querySelector('.intro__button')

introButton.addEventListener('click', () => {
    window.scrollBy({
        top: scrollTop(document.querySelector('#quiz')),
        behavior: 'smooth'
    })
})

/* Footer Scroll */

const footerButton = document.querySelector('.footer .button')

footerButton.addEventListener('click', Event => {
    Event.preventDefault()
    window.scrollBy({
        top: scrollTop(document.querySelector('#intro')),
        behavior: 'smooth'
    })
})

/* Quiz */

const info = document.querySelector('.info')
const infoInner = document.querySelector('.info__inner')

const modalRegion = document.querySelectorAll('.modal__region')
const callBtn = document.querySelectorAll('[data-region]')

callBtn.forEach((item, itemPos) => {
    item.addEventListener('click', () => {
        if (!item.classList.contains('region-no-click')) {
            modalRegion.forEach(modal => {
                if (modal.getAttribute('data-call') === item.getAttribute('data-region')) {
                    modal.classList.remove('hide')
                    modal.classList.add('show')
                    document.body.classList.add('no-scroll')
                }
            })
        }
    })
})

let correctAnswersObj = {
    brest: 0,
    brestInPercents: 0,
    gomel: 0,
    gomelInPercents: 0,
    grodno: 0,
    grodnoInPercents: 0,
    mogilev: 0,
    mogilevInPercents: 0,
    vitebsk: 0,
    vitebskInPercents: 0,
    minsk: 0,
    minskInPercents: 0
}

function correctAnswersToLocalStorage() {
    correctAnswersObj.brest = +localStorage.getItem('brest') || 0
    correctAnswersObj.brest = +localStorage.getItem('brestInPercents') || 0

    correctAnswersObj.gomel = +localStorage.getItem('gomel') || 0
    correctAnswersObj.gomel = +localStorage.getItem('gomelInPercents') || 0

    correctAnswersObj.grodno = +localStorage.getItem('grodno') || 0
    correctAnswersObj.grodno = +localStorage.getItem('grodnoInPercents') || 0

    correctAnswersObj.mogilev = +localStorage.getItem('mogilev') || 0
    correctAnswersObj.mogilev = +localStorage.getItem('mogilevInPercents') || 0

    correctAnswersObj.vitebsk = +localStorage.getItem('vitebsk') || 0
    correctAnswersObj.vitebsk = +localStorage.getItem('vitebskInPercents') || 0

    correctAnswersObj.minsk = +localStorage.getItem('minsk') || 0
    correctAnswersObj.minsk = +localStorage.getItem('minskInPercents') || 0

    console.log(correctAnswersObj)
}

function calcAnswPercents(x, y) {
    return Math.round((100 * x) / y)
}

let quizCounter = 0
let quizBtnOn = false

modalRegion.forEach(item => {
    const startButton = item.querySelector('.modal__region .button')

    let h2Answers = null

    startButton.addEventListener('click', () => {
        item.querySelector('.modal__region--intro').classList.add('hide')
        if (item.classList.contains('brest')) {
            makeInfo('Брест', 'brest', arr.length)
        }
        if (item.classList.contains('grodno')) {
            makeInfo('Гродно', 'grodno', arr.length)
        }
        if (item.classList.contains('gomel')) {
            makeInfo('Гомель', 'gomel', arr.length)
        }
        if (item.classList.contains('vitebsk')) {
            makeInfo('Витебск', 'vitebsk', arr.length)
        }
        if (item.classList.contains('minsk')) {
            makeInfo('Минск', 'minsk', arr.length)
        }
        if (item.classList.contains('mogilev')) {
            makeInfo('Могилев', 'mogilev', arr.length)
        }
        h2Answers = document.querySelectorAll('.true-box > h2')
    })

    const wrapperToRenderQuestions = item.querySelector('.modal__wrapper')

    let arr = null

    if (item.classList.contains('brest')) {
        arr = brestQuestions
    }
    if (item.classList.contains('grodno')) {
        arr = grodnoQuestions
    }
    if (item.classList.contains('gomel')) {
        arr = gomelQuestions
    }
    if (item.classList.contains('vitebsk')) {
        arr = vitebskQuestions
    }
    if (item.classList.contains('minsk')) {
        arr = minskQuestions
    }
    if (item.classList.contains('mogilev')) {
        arr = mogilevQuestions
    }
    renderQuestions(arr, wrapperToRenderQuestions)

    let modalQuestions = item.querySelectorAll('.modal__questions')

    let modalsCounter = 0
    let correctAnswers = 0

    let modalPos = 0

    let canClick = true

    item.addEventListener('click', Event => {
        let target = Event.target

        if (target.className === 'modal__question--answer') {
            if (canClick) {
                canClick = false

                if (target.dataset.answer === 'true') {
                    target.classList.add('correct')
                    h2Answers[modalsCounter].classList.add('right-answer')
                    h2Answers[modalsCounter].innerHTML = `<span class='true-box__numb'>${modalsCounter + 1}.</span>Верно`
                } else {
                    target.offsetParent.querySelector('[data-answer="true"]').classList.add('correct')
                    target.classList.add('wrong')
                    h2Answers[modalsCounter].classList.add('false-answer')
                    h2Answers[modalsCounter].innerHTML = `<span class='true-box__numb'>${modalsCounter + 1}.</span>Неверно`
                }

                modalQuestions = item.querySelectorAll('.modal__questions')

                setTimeout(() => {
                    if (target.dataset.answer === 'true') {
                        correctAnswers++
                    }

                    if (modalsCounter < arr.length - 1) {
                        modalQuestions[modalsCounter].classList.add('hide__up')
                        modalQuestions[modalsCounter + 1].classList.remove('hide__down')
                        modalsCounter++
                    } else if (modalsCounter === arr.length - 1) {
                        item.classList.add('hide')
                        item.classList.remove('show')

                        if (!quizBtnOn) {
                            document.body.classList.remove('no-scroll')

                            window.scrollBy({
                                top: scrollTop(info)
                            })
                        } else {
                            window.scrollBy({
                                top: document.querySelector('#stat')
                            })
                        }

                        if (quizBtnOn) {
                            if (quizCounter < modalRegion.length - 1) {
                                quizCounter++
                                modalRegion[quizCounter].classList.remove('hide')
                                modalRegion[quizCounter].classList.add('show')
                            } else {
                                quizBtnOn = false
                                document.body.classList.remove('no-scroll')
                            }
                        }

                        if (item.classList.contains('brest')) {
                            fillRegion('brest-svg')
                            correctAnswersObj.brest = correctAnswers
                            correctAnswersObj.brestInPercents = calcAnswPercents(correctAnswers, brestQuestions.length)
                            // localStorage.setItem('brest', correctAnswersObj.brest)
                            // localStorage.setItem('brestInPercents', correctAnswersObj.brestInPercents)
                        }
                        if (item.classList.contains('grodno')) {
                            fillRegion('grodno-svg')
                            correctAnswersObj.grodno = correctAnswers
                            correctAnswersObj.grodnoInPercents = calcAnswPercents(correctAnswers, grodnoQuestions.length)
                            // localStorage.setItem('grodno', correctAnswersObj.grodno)
                            // localStorage.setItem('grodnoInPercents', correctAnswersObj.grodnoInPercents)
                        }
                        if (item.classList.contains('gomel')) {
                            fillRegion('gomel-svg')
                            correctAnswersObj.gomel = correctAnswers
                            correctAnswersObj.gomelInPercents = calcAnswPercents(correctAnswers, gomelQuestions.length)
                            // localStorage.setItem('gomel', correctAnswersObj.gomel)
                            // localStorage.setItem('gomelInPercents', correctAnswersObj.gomelInPercents)
                        }
                        if (item.classList.contains('vitebsk')) {
                            fillRegion('vitebsk-svg')
                            correctAnswersObj.vitebsk = correctAnswers
                            correctAnswersObj.vitebskInPercents = calcAnswPercents(correctAnswers, vitebskQuestions.length)
                            // localStorage.setItem('vitebsk', correctAnswersObj.vitebsk)
                            // localStorage.setItem('vitebskInPercents', correctAnswersObj.vitebskInPercents)
                        }
                        if (item.classList.contains('minsk')) {
                            fillRegion('minsk-svg')
                            correctAnswersObj.minsk = correctAnswers
                            correctAnswersObj.minskInPercents = calcAnswPercents(correctAnswers, minskQuestions.length)
                            // localStorage.setItem('minsk', correctAnswersObj.minsk)
                            // localStorage.setItem('minskInPercents', correctAnswersObj.minskInPercents)
                        }
                        if (item.classList.contains('mogilev')) {
                            fillRegion('mogilev-svg')
                            correctAnswersObj.mogilev = correctAnswers
                            correctAnswersObj.mogilevInPercents = calcAnswPercents(correctAnswers, mogilevQuestions.length)
                            // localStorage.setItem('mogilev', correctAnswersObj.mogilev)
                            // localStorage.setItem('mogilevInPercents', correctAnswersObj.mogilevInPercents)
                        }
                        modalsCounter = 0
                        correctAnswers = 0
                        // correctAnswersToLocalStorage()
                        calcStat()
                    }
                }, 500)

                setTimeout(() => {
                    canClick = true
                }, 1000)
            }
        }
    })

    // modalQuestions.forEach((modal, modalPos) => {

    //     const answerBtns = modal.querySelectorAll('.modal__question--answer')

    //     let canClick = true

    //     answerBtns.forEach((btn) => {
    //         btn.addEventListener('click', () => {

    //         })
    //     })
    // })
})

const quizBtn = document.querySelector('.quiz-btn')

quizBtn.addEventListener('click', () => {
    const wrapperToRenderQuestions = document.querySelectorAll('.modal__wrapper')
    bodyNoScroll()
    modalRegion[quizCounter].classList.remove('hide')
    modalRegion[quizCounter].classList.add('show')

    quizBtnOn = true
    quizCounter = 0

    for (let i = 0; i <= wrapperToRenderQuestions.length - 1; i++) {
        renderQuestions(allQuestions[i], wrapperToRenderQuestions[i])
    }
})

const statList = document.querySelectorAll('.stat-list')

function calcStat() {
    statList.forEach((item, itemPos) => {
        let region = item.querySelector('.region')
        let regionProgress = item.querySelector('.stat__progress--bar')
        let perSent = item.querySelector('.per-sent')

        let counter = itemPos + 1

        switch (counter) {
            case 1:
                // perSent.innerHTML = `${+localStorage.getItem('brestInPercents')}%`
                // regionProgress.setAttribute('value', +localStorage.getItem('brestInPercents'))
                perSent.innerHTML = `${correctAnswersObj.brestInPercents}%`
                regionProgress.setAttribute('style', `width: ${correctAnswersObj.brestInPercents}%`)
                break;
            case 2:
                // perSent.innerHTML = `${+localStorage.getItem('vitebskInPercents')}%`
                // regionProgress.setAttribute('value', +localStorage.getItem('vitebskInPercents'))
                perSent.innerHTML = `${correctAnswersObj.vitebskInPercents}%`
                regionProgress.setAttribute('style', `width: ${correctAnswersObj.vitebskInPercents}%`)
                break;
            case 3:
                // perSent.innerHTML = `${+localStorage.getItem('gomelInPercents')}%`
                // regionProgress.setAttribute('value', +localStorage.getItem('gomelInPercents'))
                perSent.innerHTML = `${correctAnswersObj.gomelInPercents}%`
                regionProgress.setAttribute('style', `width: ${correctAnswersObj.gomelInPercents}%`)
                break;
            case 4:
                // perSent.innerHTML = `${+localStorage.getItem('grodnoInPercents')}%`
                // regionProgress.setAttribute('value', +localStorage.getItem('grodnoInPercents'))
                perSent.innerHTML = `${correctAnswersObj.grodnoInPercents}%`
                regionProgress.setAttribute('style', `width: ${correctAnswersObj.grodnoInPercents}%`)
                break;
            case 5:
                // perSent.innerHTML = `${+localStorage.getItem('mogilevInPercents')}%`
                // regionProgress.setAttribute('value', +localStorage.getItem('mogilevInPercents'))
                perSent.innerHTML = `${correctAnswersObj.mogilevInPercents}%`
                regionProgress.setAttribute('style', `width: ${correctAnswersObj.mogilevInPercents}%`)
                break;
            case 6:
                // perSent.innerHTML = `${+localStorage.getItem('minskInPercents')}%`
                // regionProgress.setAttribute('value', +localStorage.getItem('minskInPercents'))
                perSent.innerHTML = `${correctAnswersObj.minskInPercents}%`
                regionProgress.setAttribute('style', `width: ${correctAnswersObj.minskInPercents}%`)
                break;
        }

        let countAvgReg = (correctAnswersObj.brestInPercents + correctAnswersObj.vitebskInPercents + correctAnswersObj.gomelInPercents + correctAnswersObj.grodnoInPercents + correctAnswersObj.mogilevInPercents + correctAnswersObj.minskInPercents) / 6
		
		document.querySelector('.avg__numb').innerHTML = `${countAvgReg.toFixed(2)}%`
    })
}
calcStat()

function renderQuestions(arr, insertElem) {
    insertElem.innerHTML = ''
    for (let i = 0; i <= arr.length - 1; i++) {
        const modalQuestion = document.createElement('div')
        modalQuestion.classList.add('modal__questions')

        if (i > 0) modalQuestion.classList.add('hide__down')

        const obj = arr[i]

        modalQuestion.innerHTML = `
        <div class="modal__question--numb-paddingTop">
            <div class="modal__question--numb">
                Вопрос 
                <span class="modal__question--numb__current">${i + 1}</span> 
                из 
                <span class="modal__question--numb__global">${arr.length}</span> 
            </div>
        </div>
    
        <div class="modal__question--wrapper">
    
            <div class="modal__question">
                <div class="modal__question--image">
                    <img src="assets/images/modal-questions/${obj.image}" alt="">
                </div>
                <h1 class="modal__question--title">
                    ${obj.question}
                </h1>
                <div class="modal__question--answers">
                    ${obj.buttons.join(' ')}
                </div>
            </div>
    
        </div>`

        insertElem.insertAdjacentElement('beforeend', modalQuestion)
    }
}


function bodyNoScroll() {
    document.body.classList.add('no-scroll')
}

function makeInfo(townName, photoName, arrLength) {
    infoInner.classList.remove('no-stat')

    const infoInnerH3 = infoInner.querySelector('.city-name')
    const infoInnerImg = infoInner.querySelector('.img-box > img')
    const trueBox = infoInner.querySelector('.true-box')

    cityNameDefaultClasses = infoInnerH3.getAttribute('class')

    infoInnerH3.innerHTML = townName
    infoInnerH3.setAttribute('class', 'h2 city-name')
    infoInnerH3.classList.add(`city-${photoName}`)
    infoInnerImg.setAttribute('src', `assets/images/info/${photoName}.png`)
    trueBox.innerHTML = ''

    for (let i = 0; i < arrLength; i++) {
        const h2 = document.createElement('h2')
        h2.innerHTML = `${i + 1}. Неизвестно`

        trueBox.insertAdjacentElement('beforeend', h2)
    }
}

function fillRegion(regionName) {
    document.querySelector(`.${regionName}`).classList.add('region-no-click')
}

/* Modal Scroll [For Adaptive] */

// const modalQuestionsOuter = document.querySelectorAll('.modal__questions')

// const numbPaddingTop = 30

// modalQuestionsOuter.forEach(item => {
//     const itemNumb = item.querySelector('.modal__question--numb')
//     const itemNumbHeight = itemNumb.clientHeight + 1

//     itemNumb.offsetParent.style.paddingTop = `${numbPaddingTop}px`

//     console.log(itemNumb.offsetParent)
    
//     item.addEventListener('scroll', () => {
//         let scrollTop = item.scrollTop

//         if (scrollTop >= numbPaddingTop) {
//             item.style.paddingTop = `${itemNumbHeight}px`
//             itemNumb.classList.add('fixed-numb')
//         } else {
//             item.style.paddingTop = `${0}px`
//             itemNumb.classList.remove('fixed-numb')
//         }
//     })
// })