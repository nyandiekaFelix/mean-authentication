const app = require('./app.js');
const config = require('./config/secrets.js');
const mongoose = require('mongoose');


const PORT = config.port;
mongoose.connect(config.database);

// start the server
app.listen(PORT, () => {
    console.log(`Magic on localhost:${PORT}`);
});