const db = require('../models/Score')

exports.postScore = async (req, res) => {
    let user = req.body
    // console.log("user add..." + JSON.stringify(user))
    
    try {
        let addedScore = await db.addScore(user);
        // console.log(addedScore)
    } catch(err){
        console.log("adding error " + err)
    }
    //console.log('hi')
    // res.redirect(301, '/memory-game/leaderboard?user='+user.name)
    res.json("hello")
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
    let top5
    let userRank
    let currentUser
    console.log('1')

    rawData.then((data)=> {
        userInfos = data
        let users = userInfos.recordset
        console.log('2')


        users = users.map(({Username, Score}) => {
            Score = parseInt(Score)
            return {Username, Score}
        })

        console.log('3')
        users.sort((a,b) => b.Score - a.Score)        
        
        let currentUserName = req.query.user
        console.log('4')

        // This is not using find properly..
        currentUser = users.find((user) => {
            if (user.Username == currentUserName) {
                return user.Username
            }
        })
        
        console.log('5')

        if (currentUser == undefined) {
            console.log('undefined')
        }

        console.log('6')


        top5 = users.slice(0,5)

        userRank = 0

        console.log('7')

        for (let [index, val] of users.entries()) {
            if (val == currentUser) {
                userRank = index+1
            }
        }

        console.log('8')

        console.log("currentUser " + currentUser)
        
        console.log('9')

        res.render('leaderboard', { top5: top5, currentUser: currentUser, userRank: userRank})
    })

    console.log('one last thing')

}
