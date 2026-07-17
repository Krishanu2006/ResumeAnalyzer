const mongoose = require('mongoose'); //Import mongoose for MongoDB interactions

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true,"Token is required to be blacklisted"] //Token is required to be blacklisted
    }
},{
    timestamps: true //Automatically add createdAt and updatedAt fields
})

const tokenBlackListModel = mongoose.model('blacklistsToken',blackListTokenSchema); //Create a model named 'TokenBlackList' using the blackListTokenSchema
//Blacklisted tokens will be stored in the 'blacklistsToken' collection in the database

module.exports = tokenBlackListModel; //Export the tokenBlackListModel for use in other parts of the application