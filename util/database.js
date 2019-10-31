let sql = require('mssql')

let config = {
    server: '4711memorygame.database.windows.net',
    database: 'momoDB',
    user: 'momo',
    password: 'Thisisagoodpassword1!!!',
    encrypt: true
}

const conn = new sql.ConnectionPool(config);

module.exports = conn;