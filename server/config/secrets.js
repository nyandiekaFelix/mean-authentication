require('dotenv').load();

module.exports = {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    database: process.env.MONGODB,
    port: process.env.PORT
}