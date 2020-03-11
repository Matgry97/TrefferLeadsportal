const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        minlength: 5
    }, 
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        minlength: 5
    },
    password_confirmation: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema); 