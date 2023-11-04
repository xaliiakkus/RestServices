const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim:true
    },
    name: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    stock: {
        type: Number,
        default:0
    },
    price: {
        type: Number,
        default:0
    },
    date: {
        type: Date,
        default:new Date()
    },
    images: {
        type: String,
        url:String,
    },
})
module.exports = mongoose.model('Post', PostSchema);