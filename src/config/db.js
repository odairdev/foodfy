const { Pool } = require('pg')

module.exports = new Pool({
    user: "template",
    password: '123',
    port: '5432',
    host: 'localhost',
    database: 'foodfy'
})