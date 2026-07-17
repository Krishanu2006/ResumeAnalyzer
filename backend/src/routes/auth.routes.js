const {Router} = require('express');
const authController = require('../controllers/auth.controller'); //Import the authController
const authRouter = Router();
const authMiddleware = require('../middleware/auth.middleware'); //Import the authMiddleware
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController); //Use the registerUserController for the '/register' route
/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post('/login', authController.loginUserController); //Use the loginUserController for the '/login' route
/**
 * @route GET /api/auth/logout
 * @description clear the token from the user cookie and add the token to the blacklist
 * @access Public
 */
authRouter.get('/logout', authController.logoutUserController); //Use the logoutUserController for the '/logout' route

/**
 * @route GET /api/auth/get-me
 * @description Get the logged-in user's information
 * @access Private
 */
authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController); //Use the getMeController for the '/get-me' route

module.exports = authRouter;