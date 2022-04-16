const mongoose = require('mongoose');

async function connect() {
    let url_connext_db = process.env.URL_CONNECT_DB || 'mongodb://localhost:27017/smart_home';
    try {
        await mongoose.connect(url_connext_db, {
            useUnifiedTopology: true,
	        useNewUrlParser: true,
        });
        console.log('Connect successful');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { connect };
