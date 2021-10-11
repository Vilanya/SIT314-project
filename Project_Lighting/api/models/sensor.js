const mongoose = require('mongoose');

module.exports = mongoose.model('Sensor', new mongoose.Schema({ 
    id: String,
    sensordata: String,
    time: Date
}));