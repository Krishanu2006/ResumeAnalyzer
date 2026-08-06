require("dotenv").config();  //Load environment variables from .env file
console.log({
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_GEN_AI_API_KEY: process.env.GOOGLE_GEN_AI_API_KEY?.substring(0, 10) + "..."
});
const app = require('./src/app');  //Import the express app
const connectDB = require('./src/config/database');  //Connect to the database

connectDB();  //Call the function to connect to the database
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); //Start the server and listen on PORT