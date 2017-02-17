const app = require('./app.js');
const config = require('./config/main.js');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 7777;
mongoose.connect(config.database);  


// start the server
app.listen(PORT, () => {
  	console.log(`Magic on localhost:${PORT}`);
});


