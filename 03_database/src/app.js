/*
    EXPRESS APPLICATION

    - Ye file hamare Express application ko configure karne ke liye hai.
    - Yahan hum middleware aur Notes API ke routes define karenge.
    - Server ko actually start karne ka kaam server.js file me hoga.
*/

const express = require('express');

const app = express();


/*
    NOTE MODEL

    - noteModel ko note.model.js file se import kar rahe hain.
    - noteModel, noteSchema se create kiya gaya Mongoose Model hai.
    - Isi Model ke through hum MongoDB ke notes collection ke saath
      interact karenge.

    - noteModel ka use karke hum database par CRUD operations perform kar sakte hain:

        1. Create → New note database me store karna
        2. Read   → Existing notes database se fetch karna
        3. Update → Existing note ko modify karna
        4. Delete → Existing note ko database se remove karna
*/

const noteModel = require("./models/note.model");


/*
    NOTE STRUCTURE

    - Har note MongoDB me ek document ke form me store hoga.

    Example:

    {
        title: "My First Note",
        description: "Learning MongoDB"
    }

    - Is document ka basic structure noteSchema define karta hai.
    - noteModel ke through hum is type ke documents ko MongoDB me
      create, read, update aur delete kar sakte hain.
*/


/*
    EXPRESS JSON MIDDLEWARE

    - Client jab JSON data backend ko bhejta hai,
      Express ko us incoming JSON data ko parse karna hota hai.
    - express.json() middleware incoming JSON request body ko parse karta hai.
    - Parse hone ke baad client ka data req.body ke andar available hota hai.

    Example:

    Client → POST /notes

    {
        "title": "My First Note",
        "description": "Learning MongoDB"
    }

    ↓

    req.body
*/

app.use(express.json());


/*
    NOTES API ROUTES

    - Yahan hum Notes API ke different routes define karenge.
    - Har HTTP method ka apna specific purpose hoga.

    Routes:

        POST   /notes       → New note create karna
        GET    /notes       → Saare notes fetch karna
        DELETE /notes/:id   → Particular note delete karna
        PATCH  /notes/:id   → Particular note update karna

    - ":id" ek dynamic route parameter hai.
    - Iski actual value req.params.id ke through access kar sakte hain.
*/


/*
    CREATE NOTE API

    POST /notes

    - POST method ka use karke client se naya note receive karenge.
    - Client ka JSON data req.body ke andar milega.
    - req.body se title aur description extract kar rahe hain.
    - noteModel.create() ke through ek naya document MongoDB me create hoga.
    - Successfully create hone par client ko 201 Created response bhejenge.
*/

app.post("/notes", async (req, res) => {

    const data = req.body;

    await noteModel.create({

        title: data.title,

        description: data.description

    });

    res.status(201).json({

        message: "Note created successfully"

    });

});


/*
    GET NOTES API

    GET /notes

    - GET method ka use karke database me stored saare notes fetch karenge.
    - noteModel.find() MongoDB se matching documents ko fetch karta hai.
    - Agar koi condition nahi di gayi hai, to find() collection ke
      saare documents return karega.
    - find() ka result hamesha array hota hai.

    Possible results:

        Multiple notes:
        [
            {},
            {}
        ]

        Koi note nahi:
        []

    - Isliye saare notes ko notes variable me store kar rahe hain.
*/

app.get("/notes", async (req, res) => {

    const notes = await noteModel.find();

    res.status(200).json({

        message: "Notes Fetched Successfully!",

        notes: notes

    });

});


/*
    DELETE NOTE API

    DELETE /notes/:id

    - DELETE method ka use karke particular note ko database se delete karenge.
    - ":id" dynamic route parameter hai.
    - req.params.id se client ke URL me bheji gayi actual ID milegi.

    Example:

        DELETE /notes/64abc123

        ↓

        req.params.id
        ↓
        "64abc123"

    - findOneAndDelete() given condition ke basis par ek document find karta hai
      aur usi document ko delete kar deta hai.
    - Yahan hum _id ke basis par note ko find kar rahe hain.
*/

app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id;

    await noteModel.findOneAndDelete({

        _id: id

    });

    res.status(200).json({

        message: "Note Deleted Successfully!"

    });

});


/*
    UPDATE NOTE API

    PATCH /notes/:id

    - PATCH method ka use karke existing note ko partially update karenge.
    - ":id" dynamic route parameter hai jo batata hai ki kaunsa note update karna hai.
    - req.params.id se note ki ID access karenge.
    - req.body.description se updated description receive karenge.

    Example:

        PATCH /notes/64abc123

        Request Body:

        {
            "description": "Updated description"
        }

    - findOneAndUpdate() given condition ke basis par ek document find karta hai
      aur usme specified fields ko update karta hai.
    - Yahan _id ke basis par note find karke uski description update kar rahe hain.
*/

app.patch("/notes/:id", async (req, res) => {

    const id = req.params.id;

    const description = req.body.description;

    await noteModel.findOneAndUpdate(

        {
            _id: id
        },

        {
            description: description
        }

    );

    res.status(200).json({

        message: "Note Updated Successfully!"

    });

});


/*
    EXPORT EXPRESS APPLICATION

    - Express app ko server.js file me use karne ke liye export kar rahe hain.
    - server.js is exported app ko import karega.
    - Uske baad app.listen() ke through server start kiya jayega.
*/

module.exports = app;