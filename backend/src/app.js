const express = require('express');
const app = express();  //Initialize express app
const cookieParser = require('cookie-parser'); //Import cookie-parser for parsing cookies
const cors = require('cors'); //Import cors for handling cross-origin requests

app.use(express.json());
app.use(cookieParser()); //Use cookie-parser middleware to parse cookies in incoming requests
/*Middleware and routes will be added here*/
app.use(cors({
    origin: 'http://localhost:5173', //Allow requests from this origin
    credentials: true //Allow cookies to be sent with requests
})); //Use cors middleware to allow cross-origin requests
const authRouter = require('./routes/auth.routes');  //Import the authRouter
const interviewRouter = require('./routes/interview.routes') //Import the interviewRouter
/*use all the router here*/
app.use('/api/auth', authRouter);  //Use the authRouter for routes starting with '/api/auth'
app.use('/api/interview',interviewRouter); //use the interviewRouter for routes with 'api/interview'

module.exports = app;