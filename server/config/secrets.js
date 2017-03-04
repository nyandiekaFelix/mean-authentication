module.exports = {  
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    db: process.env.MONGODB || process.env.MONGOHQ_URL
    // 'database': 'mongodb://localhost:27017/mean-auth-starter',
}