require("dotenv").config();  //Load environment variables from .env file
const app = require('./src/app');  //Import the express app
const connectDB = require('./src/config/database');  //Connect to the database

connectDB();  //Call the function to connect to the database

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}) //Start the server and listen on port 3000