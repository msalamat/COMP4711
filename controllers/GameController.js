exports.postScore = (req, res) => {
    console.log(req.body.name_field)
    console.log('hi')
    res.redirect('/memory-game/leaderboard')
}

exports.getHomePage = (req, res) => {
    res.render('memory-game')
}

exports.getSummaryPage = (req, res) => {
    res.render('summary')
}

exports.getLeaderboardPage = (req, res) => {
    res.render('leaderboard')
}
