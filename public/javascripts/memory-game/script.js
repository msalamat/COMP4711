// "A global variable automatically becomes a part of the window object."
// windows.clicksLeft === undefined 
// If declared with var, windows.clicksLeft !=== undefined and instead === 5
let clicksLeft = 5
let score = 0

let clickingLock = true
let oneWrong = false

let nrow = 5
let ncol = 5

let switcher = true

let round = 0
let numTiles = 5

let targetObj = {}
let targetProxy = new Proxy(targetObj, {
  set: function (target, key, value) {
    if (value === 0) {
        setTimeout(nextRound, 1000)
    }  
  }
})

window.onload = () => {
    updateScore()
    updateRound()
    updateTiles()
}

const startRound = () => {
    clickingLock = true

    let indicies = getIndicies()
    let indiciesAsArray = Array.from(indicies).sort((a, b) => a - b)

    // use indicies to change button colours
    let buttons = [...document.getElementsByClassName("button")]

    let filteredButtons = buttons.filter((_, index) => indicies.has(index))

    filteredButtons.forEach((element, index, array) => {
        element.style.backgroundColor = "palegreen"
        element.setAttribute("id", indiciesAsArray[index])
    })

    localStorage.setItem("indicies", JSON.stringify(indiciesAsArray))
 
    // hide the color and rotate
    setTimeout(() => {
        rotate()
        resetColour()
        clickingLock = false
    }, 3000);
}

const rotate = () => {
    let x = document.getElementById('game-container')
    x.classList.add("rotate-90");
    x.classList.remove("rotate-neg-90");
}

const resetColour = () => {
    let bob = [...document.getElementsByClassName("button")].forEach(
        (element, index, array) => {
            element.style.backgroundColor = "#f1c40f"
        })
}

const reset = () => {
    let bob = [...document.getElementsByClassName("button")].forEach( // why do I need to assign a variable? need to store the unpacked?
        (element, index, array) => {
            element.style.backgroundColor = "#f1c40f"
        })
    
    let x = document.getElementById('game-container')
    x.classList.add("rotate-neg-90");
    x.classList.remove("rotate-90");
}

const clicked = (ref) => {
    if (!clickingLock) {
        let indicies = JSON.parse(localStorage.getItem('indicies'))

        if (clicksLeft > 0) {
            // TODO can use our buddy demorgan to reduce things !(a or b) = !a and !b
            if (ref.classList.contains('error-img') || (ref.style.backgroundColor) === "palegreen") {
                console.log('do nothing')
            } else {
                --clicksLeft
                
                if (ref.id !== "" && indicies.includes(Number(ref.id))) {
                    ref.style.backgroundColor = "palegreen"
                    ++score
                } else {
                    oneWrong = true

                    ref.classList.add('error-img')
                    
                    --score
                }
                updateScore()

                targetProxy.value = clicksLeft

                if (score < 0) {
                    console.log('LOST')
                }
            }
        } else {
            console.log('no clicks left')
        }
    }
}
 
const nextRound = () => {

    // 1. decide whether to proceed in game difficulty
    if (oneWrong) {
        // 1.1 reduce either nrow or ncol
        if (nrow === ncol) {
            --ncol
        } else if (nrow < ncol) {
            --ncol
        } else if (nrow > ncol) {
            --nrow
        }

    } else {
        // 1.2 increase either nrow or ncol
        if (nrow === ncol) {
            ++nrow
        } else if (nrow < ncol) {
            ++nrow
        } else if (nrow > ncol) {
            ++ncol
        }
    }

    ++round
    updateRound()
    
    numTiles = Math.min(nrow, ncol)
    updateTiles()

    console.log('nrow: ' + nrow)
    console.log('ncol: ' + ncol)

    // 2. reset data and restore game buttons to original state
    resetRoundData()

    // 3.1 clear current buttons
    clearGameBoard()

    // 4. construct new buttons
    let nodes = constructButtonNodes(nrow, ncol)
    // 5. insert new buttons into DOM
    insertButtonsToDOM(nodes)

    console.log('next round beginning!')

    startRound()
}

const insertButtonsToDOM = (buttons) => {
 
    let gameContainerDiv = document.createElement('div')
    gameContainerDiv.setAttribute('id', 'game-container')

    let k = 0

    for (let i = 0; i < nrow; ++i) {
        const div = document.createElement('div')

        for (let j = 0; j < ncol; ++j) {
            div.appendChild(buttons[k++])
        }

        gameContainerDiv.appendChild(div)
    }

    let containerDiv = document.getElementById('container')
    containerDiv.appendChild(gameContainerDiv)
}

const constructButtonNodes = (nrow, ncol) => {
    let buttons = []

    for (let i = 0; i < nrow * ncol; ++i) {
        let button = document.createElement('button')
        button.setAttribute('onclick', 'clicked(this)')
        button.classList.add('button')
        button.style.backgroundColor = 'rgb(241, 196, 15)'
        buttons.push(button)
    }

    return buttons
}

const clearGameBoard = () => {
    let buttons = [...document.getElementsByClassName("button")]
    buttons.forEach( (button) => button.remove())
    
    let element = document.getElementById('game-container')

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    element.remove()
}

const resetRoundData = () => {

    clicksLeft = Math.min(nrow, ncol)

    oneWrong = false

    let x = document.getElementById('game-container')
    x.classList.remove("rotate-90");
    x.classList.add("rotate-neg-90");

    // reset button attributes
    let bob = [...document.getElementsByClassName("button")].forEach(
        (element, index, array) => {
            element.removeAttribute('id')
            element.removeAttribute('style')
            element.style.backgroundColor = "f1c40f"
            element.classList.remove('error-img')
        })
}

const getIndicies = () => {
    const nums = new Set();

    while(nums.size !== Math.min(nrow, ncol)) {
        nums.add(getRandomInt(Math.pow(Math.min(nrow, ncol), 2)));
    }
    
    return nums
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const updateScore = () => {
    let scoreLabel = document.getElementById('score')
    scoreLabel.textContent = 'score: ' + score
}

const updateRound = () => {
    let roundLabel = document.getElementById('round')
    roundLabel.textContent = 'round: ' + round
}

const updateTiles = () => {
    let tilesLabel = document.getElementById('tiles')
    tilesLabel.textContent = 'tiles: ' + numTiles
}

/**
 * Construct the memory game tiles for the very first round.
 * 
 * Note: Doesn't work if put in window.onload since startRound() gets called before it
 */
const initializeGame = () => {
    let gameContainerDiv = document.createElement('div')
    gameContainerDiv.setAttribute('id', 'game-container')

    let k = 0

    for (let i = 0; i < nrow; ++i) {
        const div = document.createElement('div')

        for (let j = 0; j < ncol; ++j) {
            let button = document.createElement('button')

            button.setAttribute('onclick', 'clicked(this)')
            button.classList.add('button')
            button.style.backgroundColor = 'rgb(241, 196, 15)'
            div.appendChild(button)
        }
        gameContainerDiv.appendChild(div)
    }

    let containerDiv = document.getElementById('container')
    containerDiv.appendChild(gameContainerDiv)
}

initializeGame()

startRound()
