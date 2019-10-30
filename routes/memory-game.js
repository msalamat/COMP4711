const express = require('express')
const router = express.Router()
const memGameController = require('../controllers/GameController')

router.get('/', memGameController.getHomePage)

router.get('/summary', memGameController.getSummaryPage)

router.get('/leaderboard', memGameController.getLeaderboardPage)

router.post('/', memGameController.postScore)

module.exports = router;
