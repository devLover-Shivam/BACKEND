const mongoose = require("mongoose");

/*
    MONGOOSE SCHEMA

    - Schema define karta hai ki MongoDB me humare document ka structure
      kaisa hoga.
    
    - Yahan hum ek note ke structure ko define kar rahe hain.

    - Har note ke andar:
        1. title       → String
        2. description → String

    - Schema mainly ye define karta hai ki humare data ke fields
      kis type ke hone chahiye.
*/

const noteSchema = new mongoose.Schema({

    title: String,

    description: String,

});


/*
    MONGOOSE MODEL

    - Schema ko directly CRUD operations ke liye use nahi karte.
    - mongoose.model() ke through hum Schema se ek Model create karte hain.

    - "note" model ka naam hai.
    - noteSchema batata hai ki is model ke documents ka structure kya hoga.

    - Ye Model MongoDB collection ke saath interact karne ke liye
      use kiya jayega.

    - Isi Model ke through hum future me:
        1. Create → New notes create karenge
        2. Read   → Existing notes fetch karenge
        3. Update → Notes update karenge
        4. Delete → Notes delete karenge
*/

const noteModel = mongoose.model("note", noteSchema);


/*
    EXPORT MODEL

    - noteModel ko doosri files me use karne ke liye export kar rahe hain.
    - Routes/controllers is Model ko import karke database ke saath
      CRUD operations perform kar sakte hain.
*/

module.exports = noteModel;