const jwt = require('jsonwebtoken'); //Import jsonwebtoken for generating JWT tokens
const tokenBlackListModel = require('../models/blacklist.model'); //Import the tokenBlackListModel for blacklisting tokens
async function authUser(req, res, next) {
    const token = req.cookies.token; //Get the token from the request cookies
    if(!token) { //If no token is found in the request cookies
        return res.status(401).json({message: "No token found"}); //Return a 401 Unauthorized response with an error message
    }
    const isTokenBlacklisted = await tokenBlackListModel.findOne({token}); //Check if the token is blacklisted in the database
    if(isTokenBlacklisted) { //If the token is blacklisted
        return res.status(403).json({message: "Token is invalid"}); //Return a 403 Forbidden response with an error message
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //Verify the token using the secret key from environment variables
        req.user = decoded; //Attach the decoded token payload to the request object
        next(); //Call the next middleware function
    }catch(err) {
        return res.status(403).json({message: "Invalid token"}); //Return a 403 Forbidden response with an error message
    }
}

module.exports = {authUser}; //Export the middleware function for use in routes