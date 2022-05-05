const mongoose = require('mongoose');
const { database_url } = require('../config');

async function connect() {
    await mongoose.connect(database_url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).catch(error => {console.log(error.message)});
    
    mongoose.connection.on('error', (error) => {
        console.log('MongoDB connection error')
        console.log(JSON.stringify(error))
      })
      
    mongoose.connection.once('open', () => {
        console.log('MongoDB connection connect successfully')
    })
}

module.exports = { connect };
