const mongoose = require("mongoose")

const volumeSchema = new mongoose.Schema({
    zone:{
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    tank: {
        type: String,
        required: true
    },
    totalV: {
        type: Number,
        required: true,
        min: 0,
        max: 17000
    },
    waterV: {
        type: Number,
        required: true,
        min: 0,
        max: 17000
    },
    productV: {
        type: Number,
        required: true,
        min: 0,
        max: 17000
    }
})

const Volume = new mongoose.model('Volume', volumeSchema);

module.exports = Volume;