require("dotenv").config();  //Load environment variables from .env file
console.log({
  GOOGLE_GENAI_USE_VERTEXAI: process.env.GOOGLE_GENAI_USE_VERTEXAI,
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_GEN_AI_API_KEY: process.env.GOOGLE_GEN_AI_API_KEY?.substring(0, 10) + "..."
});
const app = require('./src/app');  //Import the express app
const connectDB = require('./src/config/database');  //Connect to the database

connectDB();  //Call the function to connect to the database

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}) //Start the server and listen on port 3000