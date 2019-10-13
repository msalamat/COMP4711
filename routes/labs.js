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

module.exports = router;
