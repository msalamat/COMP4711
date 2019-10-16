const express = require('express')
const router = express.Router()

router.get('/1', (req, res, next) => {
    res.redirect('/')
})

router.get('/2', (req, res, next) => {
    res.render('lab02')
})

router.get('/3', (req, res, next) => {
    res.render('lab03')
})

router.get('/4', (req, res, next) => {
    res.render('lab04')
})

router.get('/5', (req, res, next) => {
    res.render('lab05')
})

router.get('/5/artists', (req, res, next) => {
    const fs = require('fs')
    const path = process.cwd() + '/public/files/artists.json'

    fs.readFile(path, (err, data) => {
        if (err) {
          console.error("error: " + err)
          return
        }
        res.send(data) // how to do this with res.json(data) ? on other side I get bytes..
      })

})

router.post('/5', (req, res, next) => {
    const fs = require('fs')

    let artist = req.body
    JSON.stringify(artist)

    const path = process.cwd() + '/public/files/artists.json'

    try {
        fs.readFile(path, function (err, data) {
            let json = JSON.parse(data)
            json.push(artist)

            fs.writeFile(path, JSON.stringify(json), function (err) {
                if (err) throw err
            })            
        })
    } catch (error) {
        console.error('Error:', error)
    }

    fs.close()
})

router.delete('/5',  (req, res) => {

    const fs = require('fs')
    const path = process.cwd() + '/public/files/artists.json'

    let id = req.body
    id = id[0]
    
    try {
        fs.readFile(path, function (err, data) {
            let jsonArtists = JSON.parse(data)

            const filterItems = (arr, query) => {
                return arr.filter(item => item.id.toString() !== query.toString())
            }

            let filteredArtists = filterItems(jsonArtists, id)

            fs.writeFile(path, JSON.stringify(filteredArtists), function (err) {
                if (err) throw err
            })
        })
    } catch (error) {
        console.error('Error:' +  error)
    }
})

module.exports = router
