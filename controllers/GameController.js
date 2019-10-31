const db = require('../models/Score')

exports.postScore = async (req, res) => {
    let user = req.body
    // console.log("user add..." + JSON.stringify(user))

    try {
        let addedScore = await db.addScore(user);
        // console.log(addedScore)
    }catch(err){
        console.log("adding error " + err)
    }
    //console.log('hi')
    // res.redirect(301, '/memory-game/leaderboard?user='+user.name)
}

exports.getHomePage = (req, res) => {
    res.render('memory-game')
}

exports.getSummaryPage = (req, res) => {
    res.render('summary')
}

exports.getLeaderboardPage = async (req, res) => {

    let rawData = db.getAllScores();
    let userInfos;

    rawData.then((data)=> {
        userInfos = data
        let users = userInfos.recordset

        users = users.map(({Username, Score}) => {
            Score = parseInt(Score)
            return {Username, Score}
        })

        users.sort((a,b) => b.Score - a.Score)        
        
        let currentUserName = req.query.user

        // This is not using find properly..
        let currentUser = users.find((user) => {
            if (user.Username == currentUserName) {
                return user.Username
            }
        })

        let top5 = users.slice(0,5)

        let userRank = 0

        for (let [index, val] of users.entries()) {
            if (val == currentUser) {
                userRank = index+1
            }
        }

        res.render('leaderboard', { top5: top5, currentUser: currentUser, userRank: userRank})
    })

}
