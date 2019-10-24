var mongoose=require('mongoose');
var bcrypt=require('bcrypt');

var userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },

    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    }
});
