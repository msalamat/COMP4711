var express = require('express');
var router = express.Router();

router.get('/1', (req, res, next) => {
    res.redirect('/')
});

router.get('/2', (req, res, next) => {
    res.render('lab02')
});

router.get('/3', (req, res, next) => {
    res.render('lab03')
});

router.get('/4', (req, res, next) => {
    res.render('lab04')
});

router.get('/5', (req, res, next) => {
    res.render('lab05')
});

router.post('/5', (req, res, next) => {
    const fs = require('fs')

    let artist = req.body
    JSON.stringify(artist)

    const path = process.cwd() + '/public/files/artists.json'

    try {
        fs.readFile(path, function (err, data) {
            var json = JSON.parse(data);
            console.log(json);
            json.push(artist);

            fs.writeFile(path, JSON.stringify(json), function (err) {
                if (err) throw err;
            });
        });
    } catch (error) {
        console.error('Error:', error)
    }
});

module.exports = router;
