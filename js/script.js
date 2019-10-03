window.onload = () => {
    document.getElementById('searchForm').style.display = 'none'
    document.getElementsByClassName('form-submit')[0].style.display = 'none'
    document.getElementsByClassName('artist')[0].setAttribute('id', 1)
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

addArtist = () => {
    const artist = getArtistDetails()

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

    h3.innerText = artist.name
    p.innerText = artist.desc
    img.src = artist.pic

    button.innerText = 'Delete'
    button.setAttribute("onclick", "deleteArtist(this)")

    // to truly get a random number: https://stackoverflow.com/a/40591207
    const randomID = Date.now() + Math.round(Math.random())
    artistDiv.setAttribute('id', `${randomID}`)
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
    artist.remove()
}
