const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: [true,"Username already exists"]
    },
    email:{
        type: String,
        required: true,
        unique: [true,"Email already exists"]
    },
    password:{
        type: String,
        required: true
    }
})

const userModel = mongoose.model('User',userSchema); //Create a model named 'User' using the userSchema
//Users details will be stored in the 'users' collection in the database

module.exports = userModel; //Export the userModel for use in other parts of the application