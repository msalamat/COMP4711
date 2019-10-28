let element = document.getElementById("game-container");
let clicksLeft = 5
let clickingLock = true
let score = 0

const rotate = () => {
    element.classList.add("rotate-90");
    element.classList.remove("rotate-neg-90");
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

    element.classList.add("rotate-neg-90");
    element.classList.remove("rotate-90");
}

const clicked = (ref) => {
    if (!clickingLock) {
        let indicies = JSON.parse(localStorage.getItem('indicies'))

        // THE LOGIC

        // do you have clicks remaining?
        // yes?
        //      has the button already been clicked?
        //      (i.e. button has error-img tag
        //        OR button's color is palegreen)
        //      yes?
        //          do nothing
        //      no?
        //          clicks--
        //          is it a successful click?
        //              give green colour to btn
        //          is it a failed click?
        //              give error picture to btn
        // no?
        //      do nothing

        if (clicksLeft > 0) {
            // TODO can use our buddy demorgan to reduce things !(a or b) = !a and !b
            if (ref.classList.contains('error-img') || (ref.style.backgroundColor) === "palegreen") {
                console.log('do nothing')
            } else {
                --clicksLeft
                if (indicies.includes(Number(ref.id))) {
                    ref.style.backgroundColor = "palegreen"
                    ++score
                } else {
                    ref.classList.add('error-img')
                    if (score > 0) {
                        --score
                    }
                }
                updateScore()
            }
        } else {
            console.log('no clicks left')
        }
    }
}

const startRound = () => {
    clickingLock = true
    // generate random unique numbers between 0-24
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

const getIndicies = () => {
    const nums = new Set();

    while(nums.size !== 5) {
        nums.add(getRandomInt(25));
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

startRound()
