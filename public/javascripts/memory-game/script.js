

let gridSize = 5
let clicksLeft = 5
let clickingLock = true
let score = 0
let oneWrong = false

let targetObj = {}
let targetProxy = new Proxy(targetObj, {
  set: function (target, key, value) {
    if (value === 0) {
        setTimeout(nextRound, 1000)
    }  
  }
})

const startRound = () => {
    clickingLock = true
    // generate random unique numbers between 0-gridSide^2 (i.e. 25, 36, 49, etc..)
    let indicies = getIndicies()
    let indiciesAsArray = Array.from(indicies).sort((a, b) => a - b)

    // use indicies to change button colours
    let buttons = [...document.getElementsByClassName("button")]

    let filteredButtons = buttons.filter((_, index) => indicies.has(index))

    filteredButtons.forEach( (element, index, array) => {
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
                    
                    if (score > 0) {
                        --score
                    }
                }
                updateScore()
                targetProxy.value = clicksLeft
            }
        } else {
            console.log('no clicks left')
        }
    }
}

const nextRound = () => {
    // 1. decide whether to proceed in game difficulty
    if (oneWrong) {
        // 1.1 reduce matrix size by n-1, condition n >= 5
        if (gridSize !== 5) {
            --gridSize
        }
    } else {
        // 1.2 increase size
        ++gridSize
    }

    console.log('gridSize: ' + gridSize)

    // 2. reset data and restore game buttons to original state
    resetRoundData()

    // 3.1 clear current buttons
    clearGameBoard()

    // 4. construct new buttons
    let nodes = constructButtonNodes(gridSize)
    // 5. insert new buttons into DOM
    insertButtonsToDOM(nodes)

    console.log('next round beginning!')

    startRound()
}

const insertButtonsToDOM = (buttons) => {
 
    let gameContainerDiv = document.createElement('div')
    gameContainerDiv.setAttribute('id', 'game-container')

    let k = 0

    for (let i = 0; i < gridSize; ++i) {
        const div = document.createElement('div')

        for (let j = 0; j < gridSize; ++j) {
            console.log('k: ' + k)
            div.appendChild(buttons[k++])

        }
        gameContainerDiv.appendChild(div)
    }

    let containerDiv = document.getElementById('container')
    containerDiv.appendChild(gameContainerDiv)
}

const constructButtonNodes = (n) => {
    let buttons = []

    for (let i = 0; i < Math.pow(n, 2); ++i) {
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

    clicksLeft = gridSize

    oneWrong = false

    let x = document.getElementById('game-container')
    x.classList.remove("rotate-90");
    x.classList.add("rotate-neg-90");

    // reset button attributes
    let bob = [...document.getElementsByClassName("button")].forEach(
        (element, index, array) => {
            element.removeAttribute('id')
            element.removeAttribute('style') // guess we have to do this too..
            element.style.backgroundColor = "f1c40f"
            element.classList.remove('error-img')
        })
}

const getIndicies = () => {
    const nums = new Set();

    while(nums.size !== gridSize) {
        nums.add(getRandomInt(Math.pow(gridSize, 2)));
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

/**
 * Construct the memory game tiles for the very first round.
 * 
 * Note: Doesn't work if put in window.onload since startRound() gets called before it
 */
const initializeGame = () => {
    let gameContainerDiv = document.createElement('div')
    gameContainerDiv.setAttribute('id', 'game-container')

    let k = 0

    for (let i = 0; i < gridSize; ++i) {
        const div = document.createElement('div')

        for (let j = 0; j < gridSize; ++j) {
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
