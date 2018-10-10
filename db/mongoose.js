const mongoose = require('mongoose');

//Configure mongoose's promise to global promise
mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGODB_URI);
// mongoose.set('debug', true);

module.exports = {
    mongoose
}