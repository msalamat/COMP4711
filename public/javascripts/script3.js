window.onload = () => {
    document.getElementById('searchForm').style.display = 'none'
    document.getElementsByClassName('form-submit')[0].style.display = 'none'

    displayArtistsFromFiles()
}

addArtist = () => {

    const artist = getArtistDetails() // object. if I do JSON.stringify turns into json (as a string)

    const randomID = Date.now() + Math.round(Math.random())
    artist.id = randomID

    const url = '/labs/5'

    try {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(artist),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('Error:', error)
    }

    displayArtist(artist)

    clearForm()
}

displayArtist = (artist) => {
    const {artistDiv, h3, p, img} =  constructArtistNodes()

    h3.innerText = artist.name
    p.innerText = artist.desc
    img.src = artist.pic
    artistDiv.setAttribute('id', `${artist.id}`)
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

clearForm = () => {
    const form = document.getElementById('searchForm')
    form.reset()
    toggleAddRmvArtist()
}

toggleAddRmvArtist = () => {
    let x = document.getElementById('searchForm')
    let y = document.getElementsByClassName('form-submit')[0]

    if (x.style.display === 'none' || y.style.display === 'none') {
        x.style.display = 'block'
        y.style.display = 'block'
    } else {
        x.style.display = 'none'
        y.style.display = 'none'
    }
}

displayArtistsFromFiles = () => {
    const url = '/labs/5/artists'

    const response = getData(url)

    response.then((result) => {
        // just to see what's going on!
        let stringJSON = JSON.stringify(result)
        let jsonJSON = JSON.parse(stringJSON) // i.e. result

        jsonJSON.forEach((item) => {
            const {artistDiv, h3, p, img} =  constructArtistNodes()

            h3.innerText = item.name
            p.innerText = item.desc
            img.src = item.pic
            artistDiv.setAttribute('id', `${item.id}`)
        })        
    })
}

deleteArtist = (ref) => {
    const url = '/labs/5'

    const artistID = ref.parentNode.parentNode.id
    const artist = document.getElementById(artistID)

    artist.remove() // remove nodes

    let id = []
    id.push(artistID)

    try {
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(id), // not sure how to send a pure string through..
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('Error:', error)
    }
}

searchArtistAndDisplay = () => {
    const url = '/labs/5/artists'

    const response = getData(url)

    let searchQuery = document.getElementsByTagName('input')[0].value.toUpperCase()
    response.then((allArtists) => {        
        let artists = []

        for (let item of allArtists) {
            let name = item.name.toUpperCase()
            
            if (name.includes(searchQuery)) {
                artists.push(item.id)
            }
        }
        hideArtists(artists)
    })
}

hideArtists = (artistIds) => {

    let allArtists = [...document.getElementsByClassName('artist')]

    allArtists.forEach((artist) => {
        if (!artistIds.includes(Number(artist.id))) {
            artist.style.display = "none"
        } else {
            artist.style.display = "flex"
        } 
    })
}

async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
    })

    return await response.json()
}

let searchField = document.getElementById('search-field')

searchField.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault()
        document.getElementById("search-btn").click()
  }
})
