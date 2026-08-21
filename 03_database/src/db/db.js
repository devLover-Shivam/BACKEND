const mongoose = require('mongoose');


/*
    MONGOOSE

    - Mongoose ek ODM (Object Data Modeling) library hai jo Node.js
      application ko MongoDB ke saath interact karne me help karti hai.

    - Iske through hum:
        1. MongoDB se connection establish kar sakte hain.
        2. Schemas define kar sakte hain.
        3. Models create kar sakte hain.
        4. Database par CRUD operations perform kar sakte hain.
*/


/*
    DATABASE CONNECTION

    - connectDB() function ka kaam MongoDB ke saath connection
      establish karna hai.

    - Function ko async banaya gaya hai kyuki database connection
      ek asynchronous operation hai.

    - mongoose.connect() MongoDB deployment ke saath connection
      establish karta hai.

    - Connection string ke structure ko roughly aise samajh sakte hain:

        mongodb+srv://
        username:password
        @cluster-url/
        database-name

    - URI ke end me "/halley" humare target database ka naam hai.

    - Iska matlab application MongoDB deployment se connect hoke
      "halley" database ko target karegi.

    - Agar database pehle se exist nahi karta, MongoDB generally
      usse tab create karta hai jab usme pehli baar data write kiya jata hai.
*/

async function connectDB(){

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");

}


/*
    EXPORT DATABASE CONNECTION FUNCTION

    - connectDB() ko doosri file me use karne ke liye export kar rahe hain.

    - server.js is function ko import karke database connection
      establish kar sakta hai.

    - Database successfully connect hone ke baad hi server start
      karna better practice hai.
*/

module.exports = connectDB;