let db = require('../util/database')
let sql = require('mssql')

const addScore = async (player) => {

    //console.log("player: " + player.name)
    // console.log(player.name);
    let sql = `INSERT INTO [dbo].[Players] (Username,Score) VALUES ('${player.name}',${player.score})`;
    // console.log(sql);

    await db.close()
    await db.connect();
    try {
        // const request = db.request(); // or: new sql.Request(pool1)
        // const request = new sql.Request(db)
        const request = db.request()

    	const result = request.query(sql)
        // result.then((data) => console.log("added data" + data.name)).catch(err => console.log(err))
        // await db.close()
        // return result;
	} catch (err) {
        console.error('SQL error', err);
    }
    
}

const getAllScores = async () => {
    let top5;
    console.log("get all scores 1")

    db.close()
    console.log("get all scores 2")

    return await db.connect().then(async function () {
        console.log("get all scores 3")

        let request = new sql.Request(db);
        try {
            top5 =  await request.query("SELECT * FROM Players")
        } catch(err) {
            console.log(err)
        }  
        // await db.close()
        console.log("get all scores 4")
        return top5
    }).catch(function (err) {
        console.log(err);
        // db.close();
    });
}

module.exports = {
    addScore: addScore,
    getAllScores: getAllScores,
}