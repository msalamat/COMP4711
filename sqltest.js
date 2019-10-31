// var Connection = require('tedious').Connection;
// var Request = require('tedious').Request;

// // Create connection to database
// var config =
// {
//     authentication: {
//         options: {
//             userName: 'momo', // update me
//             password: 'Thisisagoodpassword1!!!' // update me
//         },
//         type: 'default'
//     },
//     server: '4711memorygame.database.windows.net', // update me
//     options:
//     {
//         database: 'momoDB', //update me
//         encrypt: true
//     }
// }
// var connection = new Connection(config);

// // Attempt to connect and execute queries if connection goes through
// connection.on('connect', function (err) {
//     if (err) {
//         console.log(err)
//     }
//     else {
//        // queryDatabase()
//     }
// }
// );

// function queryDatabase() {
//     // Read all rows from table
//     var request = new Request(
//         "SELECT TOP (1000) [Userid],[Username],[Score] FROM [dbo].[Players]",
//         function (err, rowCount, rows) {
//             process.exit();
//         }
//     );
//     //console.log(request);
//     let result = [];
//     request.on('row', function (columns) {
//         columns.forEach(function (column) {
//             let each = [];
//             each[column.metadata.colName] = column.value;
            
//             result.push(each);
//             console.log(result);
//          //   console.log(column.metadata.colName + " " + column.value);
//         });
//     });

//     request.on('done', (rowCount, more, rows) => {
//         rows.forEach(row => {
//             console.log("inside for each" + row)
//         })
//     } )
//     connection.execSql(request)
//     return result
// }

// module.exports = { 
//     darrenFunc : queryDatabase
// }
