const mongoose = require('mongoose');
var movieSchema = new mongoose.Schema({
    moviename:{
        type:String,
        required:true
    },

    Genre:{
        type:String,
        required:true
    },
    Rating:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('movie',movieSchema)