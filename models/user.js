const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const FracUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

FracUserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("FracUser", FracUserSchema);