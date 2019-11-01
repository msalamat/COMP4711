let sql = require('mssql')

let config = {
    server: '4711memorybetterserver.database.windows.net',
    database: 'momoDB22',
    user: 'momo',
    password: 'Thisisagoodpassword1!!!',
    encrypt: true
}

const conn = new sql.ConnectionPool(config);

module.exports = conn;