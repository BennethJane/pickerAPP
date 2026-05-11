const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
    },
    weatherTemp: {
        type: String
    
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    
}, {timeStamps: true});

const weatherModel = mongoose.model('weather', weatherSchema);

module.exports = weatherModel;