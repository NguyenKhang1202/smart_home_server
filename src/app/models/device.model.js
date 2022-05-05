const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    roomId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);
