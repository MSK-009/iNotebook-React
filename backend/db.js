const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/inotebook?readPreference=primary'
const connectToMongo = async () => {
    mongoose.connect(mongoURI)
    console.log('HI')
}

module.exports = connectToMongo;