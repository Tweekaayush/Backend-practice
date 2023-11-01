const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        default: new Date()
    },
    score:{
        type: Number,
    },
    rating:{
        type: String,
    },
    genre: {
        type:Array,
        default: []
    }
})

module.exports = mongoose.model("Movie", movieSchema)