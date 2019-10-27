let angle = 90
let element = document.getElementById("game-container");
let numClicksLeft = 6

const rotate = () => {
    element.classList.add("rotate-90");
    element.classList.remove("rotate-neg-90");

}

const resetColour = () => {
    let bob = [...document.getElementsByClassName("button")].forEach(
        (element, index, array) => {
            element.style.backgroundColor = "salmon"
        })
}

const reset = () => {
    let bob = [...document.getElementsByClassName("button")].forEach( // why do I need to assign a variable? need to store the unpacked?
        (element, index, array) => {
            element.style.backgroundColor = "salmon"
        })

    element.classList.add("rotate-neg-90");
    element.classList.remove("rotate-90");

}

const clicked = (ref) => {
    if (numClicksLeft-- > 0) {
        ref.style.backgroundColor = "palegreen"
        console.log(numClicksLeft)
    }
}

const startRound = () => {
    // generate random unique numbers between 0-24
    let indicies = getIndicies()

    // use indicies to change button colours
    let buttons = [...document.getElementsByClassName("button")]
    let filteredButtons = buttons.filter((_, index) => indicies.has(index))

    filteredButtons.forEach( (element, index, array) => {
        element.style.backgroundColor = "palegreen"
    })

    // hide the color and rotate
    setTimeout(() => {
        rotate()
        resetColour()
    }, 3000);
}




// generate random unique numbers between 0-24

// show the button colors matrix briefly

// hide the color 

// rotate

const getIndicies = () => {
    const nums = new Set();

    while(nums.size !== 5) {
        nums.add(getRandomInt(25));
    }
    
    return nums
    // return Array.from(nums)
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

startRound()