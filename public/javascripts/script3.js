window.onload = () => {
    document.getElementById('searchForm').style.display = 'none'
    document.getElementsByClassName('form-submit')[0].style.display = 'none'

    //displayArtistsFromFiles()
}

addArtist = () => {
    
    const artist = getArtistDetails() // object. if I do JSON.stringify turns into json (as a string)
    const randomID = Date.now() + Math.round(Math.random())
    artist.id = randomID

    const url = 'http://localhost:3000/labs/5'

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

    clearForm()
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

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}