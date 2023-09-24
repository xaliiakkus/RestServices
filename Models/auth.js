const mongoose = require('mongoose');
// Schema Modelleri dizi ve değerler
const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
});

module.exports =mongoose.model('auth', AuthSchema);
