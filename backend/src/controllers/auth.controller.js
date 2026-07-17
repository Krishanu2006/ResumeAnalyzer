const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs'); //Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); //Import jsonwebtoken for generating JWT tokens
const tokenBlackListModel = require('../models/blacklist.model'); //Import the tokenBlackListModel for blacklisting tokens

// Controller function to handle user registration
/**
 * @route POST /api/auth/register
 * @description Register a new user expecting username, email, and password in the request body
 * @access Public
 * @name registerUserController
 * @param {*} res 
 */
async function registerUserController(req, res) {
   const { username, email, password } = req.body; //Destructure the request body to get username, email, and password
   if(!username || !email || !password) { //Check if any of the required fields are missing
       return res.status(400).json({message: "Please provide username, email, and password"}); //Return a 400 Bad Request response with an error message
   }
   const isUserAlreadyExists = await userModel.findOne({
    $or: [{username}, {email}] //Check if a user with the same username or email already exists in the database
   })
   if(isUserAlreadyExists) { //If a user with the same username or email already exists
       return res.status(400).json({message: "User with the same username or email already exists"}); //Return a 400 Bad Request response with an error message
   }

   const hashedPassword = await bcrypt.hash(password, 10); //Hash the password using bcryptjs with a salt round of 10
   const user = await userModel.create({
    username,
    email,
    password: hashedPassword //Store the hashed password in the database
   })
   const token = jwt.sign({
    id: user._id, //Include the user's ID in the JWT payload
    username: user.username //Include the user's username in the JWT payload
   }, process.env.JWT_SECRET, {expiresIn: '1h'}) //Sign the JWT with the secret key from environment variables and set it to expire in 1 hour

   res.cookie("token", token)
   res.status(201).json({
    message: "User registered successfully", //Return a 201 Created response with a success message
    user: {
        id: user._id, //Return the user's ID
        username: user.username, //Return the user's username
        email: user.email, //Return the user's email 
    }
   })
}

/**
 * @name loginUserController
 * @route POST /api/auth/login
 * @description Login a user expecting email and password in the request body
 */
async function loginUserController(req, res) {
    const { email, password } = req.body; //Destructure the request body to get email and password
    const user = await userModel.findOne({email}); //Find a user with the provided email in the database
    if(!user) { //If no user is found with the provided email
        return res.status(400).json({message: "Invalid email or password"}); //Return a 400 Bad Request response with an error message
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); //Compare the provided password with the hashed password stored in the database
    if(!isPasswordValid) { //If the provided password does not match the hashed password
        return res.status(400).json({message: "Invalid email or password"}); //Return a 400 Bad Request response with an error message
    }

    const token = jwt.sign({
        id: user._id, //Include the user's ID in the JWT payload
        username: user.username //Include the user's username in the JWT payload
    }, process.env.JWT_SECRET, {expiresIn: '1h'}) //Sign the JWT with the secret key from environment variables and set it to expire in 1 hour

    res.cookie("token", token) //Set the JWT token in a cookie
    res.status(200).json({
        message: "User logged in successfully", //Return a 200 OK response with a success message
        user: {
            id: user._id, //Return the user's ID
            username: user.username, //Return the user's username
            email: user.email, //Return the user's email
        }
    })
}
/**
 * @name logoutUserController
 * @route POST /api/auth/logout
 * @description Logout a user by clearing the token from the user cookie and adding the token to the blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token; //Get the token from the request cookies
    if(token) { //If token is found in the request cookies
        await tokenBlackListModel.create({token}); //Add the token to the blacklist collection in the database
    }
    res.clearCookie("token"); //Clear the token from the response cookies
    res.status(200).json({message: "User logged out successfully"}); //Return a 200 OK response with a success message
}
/**
 * @name getMeController
 * @route GET /api/auth/get-me
 * @description Get the logged-in user's information
 * @access Private
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id); //Find the user in the database using the ID from the decoded JWT token
    res.status(200).json({
        message: "User information retrieved successfully", //Return a 200 OK response with a success message,
        user:{
            id: user._id, //Return the user's ID
            username: user.username, //Return the user's username
            email: user.email, //Return the user's email
        }
    })
}

module.exports = {registerUserController,loginUserController,logoutUserController,getMeController}; //Export the controller function for use in routes