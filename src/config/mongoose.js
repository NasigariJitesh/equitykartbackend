const mongoose = require('mongoose')
const env = require('./environment')
const opts = { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
}
mongoose.connect(env.db, opts)
const db = mongoose.connection

db.on('error' ,console.error.bind(console, "Error connecting to MongoDB"))

db.once('open',function() {
    console.log('Successfully connected to mongodb ')
})

module.exports = db;