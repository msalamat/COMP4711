// TODO update forEach() usages with better ES6 stuffs like map/reduce/filter etc
window.onload = () => {
    document.getElementById('searchForm').style.display = 'none'
    document.getElementsByClassName('form-submit')[0].style.display = 'none'

    //displayArtistsFromLocalStorage()
}

toggleAddRmvArtist = () => {
    var x = document.getElementById('searchForm')
    let y = document.getElementsByClassName('form-submit')[0]

    if (x.style.display === 'none' || y.style.display === 'none') {
        x.style.display = 'block'
        y.style.display = 'block'
    } else {
        x.style.display = 'none'
        y.style.display = 'none'
    }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
// see note 1. I don't need the extra parameters but it is 'preferred' because i'm modern?
addArtist = (...artistID) => {
    const {artistDiv, h3, p, img} =  constructArtistNodes()
    
    if (artistID[0] === undefined) { // a new artist is being added
        const artist = getArtistDetails()

        h3.innerText = artist.name
        p.innerText = artist.desc
        img.src = artist.pic

        const randomID = Date.now() + Math.round(Math.random()) // https://stackoverflow.com/a/40591207

        artistDiv.setAttribute('id', `${randomID}`)
        addArtistToLocalStorage(randomID)
        
        clearForm()
    } else { // an existing artist is being added back to the page
        const artist = JSON.parse(localStorage.getItem(`${artistID}`))

        h3.innerText = artist.name
        p.innerText = artist.desc
        img.src = artist.pic
        artistDiv.setAttribute('id', `${artistID}`)
    }
}

constructArtistNodes = () => {
    const artistDiv = document.createElement('div')
    const item1Div = document.createElement('div')
    const img = document.createElement('img')
    const artistPicDiv = document.createElement('div')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const item2Div = document.createElement('div')
    const button = document.createElement('button')

    artistDiv.classList.add('artist')
    item1Div.classList.add('item')
    artistPicDiv.classList.add('artist-pic', 'item')
    h3.classList.add('name')
    p.classList.add('description')
    item2Div.classList.add('item')
    button.classList.add('delete-btn')

    const x = document.getElementsByClassName('artist-bar')[0]
    x.insertAdjacentElement('afterend', artistDiv)

    artistDiv.appendChild(item1Div)
    item1Div.appendChild(img)

    artistDiv.appendChild(artistPicDiv)
    artistPicDiv.appendChild(h3)
    artistPicDiv.appendChild(p)

    artistDiv.appendChild(item2Div)
    item2Div.appendChild(button)

    button.innerText = 'Delete'
    button.setAttribute("onclick", "deleteArtist(this)")

    img.setAttribute("width","75")
    img.setAttribute("height","75")

    return {artistDiv, h3, p, img}
}

getArtistDetails = () => {
    const formDetails = document.getElementById('searchForm').elements

    const artist = {
        name: formDetails[0].value,
        desc: formDetails[1].value,
        pic: formDetails[2].value
    }

    return artist
}

deleteArtist = (ref) => {
    const artistID = ref.parentNode.parentNode.id
    const artist = document.getElementById(artistID)
    
    artist.remove() // remove nodes

    localStorage.removeItem(`${artistID}`)
}

addArtistToLocalStorage = (id) => {
    const artist = getArtistDetails()
    localStorage.setItem(`${id++}`, JSON.stringify(artist))
}

displayArtistsFromLocalStorage = () => {
    let items = Object.entries(localStorage)
    for (let i of items) {
        addArtist(i[0]) // passing the id
    }
}

clearForm = () => {
    const form = document.getElementById('searchForm')
    form.reset()
    toggleAddRmvArtist()
}

searchArtistAndDisplay = () => {
    let allArtists = Object.entries(localStorage)
    let searchQuery = document.getElementsByTagName('input')[0].value.toUpperCase()

    let artistsById = []

    // TODO update this stuff with better functions like map / reduce and all that good stuffs
    for (let i of allArtists) {
        let id = i[0]
        let name = JSON.parse(i[1]).name.toUpperCase()
        
        if (name.includes(searchQuery)) {
            artistsById.push(id)
        }
    }

    hideArtists(artistsById)
}

hideArtists = (artistIds) => {

    console.log(artistIds)
    let allArtists = [...document.getElementsByClassName('artist')]
    
    // TODO update this stuffs with better ES6 functions
    allArtists.forEach( (artist) => {
        if (!artistIds.includes(artist.id)) {
            artist.style.display = "none"
        } else {
            artist.style.display = "flex"
        }
    })
}

let searchField = document.getElementById('search-field')

searchField.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault()
        document.getElementById("search-btn").click()
  }
})
