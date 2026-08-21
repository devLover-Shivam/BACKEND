/*
    ENVIRONMENT VARIABLES

    - dotenv package ke through .env file se environment variables load kar rahe hain.
    - Isse sensitive information, jaise MongoDB connection string,
      directly code me likhne ki zarurat nahi padti.
    - Loaded variables ko process.env ke through access kar sakte hain.

    Example:

        .env
        MONGO_URI=your_mongodb_connection_string

        ↓

        process.env.MONGO_URI
*/

require("dotenv").config();


/*
    EXPRESS APPLICATION

    - app.js se configured Express application ko import kar rahe hain.
    - app.js ke andar middleware aur API routes define kiye jayenge.
    - Yahan hum sirf application ko server ke saath connect karenge.
*/

const app = require("./src/app");


/*
    DATABASE CONNECTION

    - db.js se connectDB function ko import kar rahe hain.
    - connectDB() MongoDB Atlas ke saath connection establish karta hai.
    - Database connection ka actual logic db.js file me defined hai.
*/

const connectDB = require("./src/db/db");


/*
    CONNECT TO DATABASE

    - connectDB() call karke MongoDB ke saath connection establish kar rahe hain.
    - Ye asynchronous operation hai, kyuki database se connection establish
      hone me time lag sakta hai.
*/

connectDB();


/*
    START SERVER

    - app.listen() Express server ko start karta hai.
    - 3000 humara port number hai.
    - Server successfully start hone ke baad callback function execute hoga.
*/

app.listen(3000, () => {

    console.log("Server is running on port 3000");

});