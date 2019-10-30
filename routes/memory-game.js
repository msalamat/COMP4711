const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('memory-game')
})

router.get('/summary', (req, res, next) => {
    res.render('summary')
})

router.get('/leaderboard', (req, res, next) => {
    res.render('leaderboard')
})

router.post('', (req, res, next) => {
    console.log(req.body.name_field)
    res.redirect('/memory-game/leaderboard')
})

module.exports = router;
