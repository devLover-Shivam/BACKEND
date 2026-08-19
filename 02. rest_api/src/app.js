/*
    - Ye app.js file hamare Express application ko configure karne ke liye hai.
    - Yahan hum routes aur middleware define karenge.
    - Server ko actually start karne ka kaam alag file me hoga.
*/

const express = require('express');

const app = express();


/*
    EXPRESS JSON MIDDLEWARE

    - Client jab JSON data backend ko bhejta hai,
      to Express ko us incoming JSON data ko parse karna padta hai.
    - express.json() ek middleware hai jo incoming JSON request body
      ko parse karta hai.
    - Parse hone ke baad data req.body ke andar available hota hai.
*/

app.use(express.json())


/*
    SERVER START

    - Server ko start karne ka kaam is file me nahi hoga.
    - Hum server ko apni root/server file me start karenge.
    - Is file ka main purpose Express application ko configure karna hai.
*/


/*
    NOTE KA STRUCTURE

    - Humara har note ek object ki form me hoga.
    - Har note ke andar mainly do properties hongi:
        1. title
        2. description

    Example:

    note = {
        title: "my first note",
        description: "this is my first note"
    }

    - User jitne bhi notes create karega,
      hum un sabhi note objects ko ek array ke andar store karenge.

    Example:

    const notes = [
        {
            title: "my first note",
            description: "this is my first note"
        },
        {
            title: "my second note",
            description: "this is my second note"
        }
    ]

    - Is custom API ki basic functionality hogi:
        1. Note create karna
        2. Notes fetch karna
        3. Note update karna
        4. Note delete karna
*/

const notes = [];


/*
    CREATE NOTE API

    - User note create karte waqt title aur description bhejega.
    - Ye data client se backend par request body ke andar aayega.
    - Resource create karne ke liye hum POST HTTP method use karenge.
    - "/notes" humara resource/path hai.
*/

app.post('/notes',(req,res)=>{

    /*
        REQUEST BODY

        - Client ke dwara bheja gaya JSON data req.body ke andar milega.
        - express.json() middleware is JSON data ko parse karta hai.
        - req.body ko notes array me push karke hum naya note store kar rahe hain.
    */

    notes.push(req.body);


    /*
        RESPONSE

        - 201 HTTP status code ka matlab hai ki resource successfully create ho gaya.
        - json() ke through hum client ko JSON response bhej rahe hain.
    */

    res.status(201).json({

        message: "note created successfully"

    })

});


/*
    API TESTING WITH POSTMAN

    - Abhi humne notes create karne ke liye frontend nahi banaya hai.
    - Development phase me hum Postman ka use karke APIs ko test kar sakte hain.
    - Postman ke through hum:
        1. Different HTTP requests send kar sakte hain.
        2. Request body bhej sakte hain.
        3. API response check kar sakte hain.
        4. Status codes aur response data dekh sakte hain.

    - Isliye Postman ko ek testing/client tool ki tarah samajh sakte hain.
*/


/*
    GET NOTES API

    - Ab hume backend me stored notes ko client ko bhejna hai.
    - Data fetch/retrieve karne ke liye GET HTTP method use karenge.
    - Same resource "/notes" hai, lekin HTTP method POST se GET ho gaya hai.
    - Isliye POST /notes aur GET /notes ka purpose alag hai.
*/

app.get('/notes',(req,res)=>{

    /*
        RESPONSE

        - 200 HTTP status code ka matlab hai request successfully process ho gayi.
        - json() ke through hum client ko JSON format me response bhej rahe hain.
        - notes property ke andar humara complete notes array bheja ja raha hai.
    */

    res.status(200).json({

        message:"Notes Fetched Successfully!",

        notes: notes

    })

})


/*
    DELETE NOTE API

    - Ab hum ek particular note ko delete karna chahte hain.
    - Particular note identify karne ke liye hum uska index use karenge.
    - Is operation ke liye DELETE HTTP method use karenge.
    
    DYNAMIC ROUTE PARAMETER:

    - "/notes/:index" me ":index" ek dynamic route parameter hai.
    - "notes" static part hai.
    - "index" ki value request ke according change ho sakti hai.

    Example:

        /notes/0
        /notes/1
        /notes/2

    - Yahan 0, 1 aur 2 dynamic index values hain.
*/

app.delete('/notes/:index',(req,res)=>{


    /*
        req.params

        - Express dynamic route parameters ko req.params ke andar store karta hai.
        - "/notes/:index" me jo actual index aayega,
          wo req.params.index se access kar sakte hain.

        Example:

        Request:
            DELETE /notes/2

        Then:
            req.params.index = "2"
    */

    const index = req.params.index


    /*
        DELETE NOTE

        - Ab hum notes array ke given index par stored note ko delete kar rahe hain.
        - index ki value req.params se aa rahi hai.
    */

    delete notes[ index ]


    /*
        RESPONSE

        - 200 ka matlab hai request successfully process ho gayi.
        - Client ko success message bhej rahe hain.
    */

    res.status(200).json({

        message: "note deleted successfully! "

    })

})


/*
    UPDATE NOTE API

    - Ab hume ek particular note ko update karna hai.
    - Hum PATCH HTTP method use karenge.
    - PATCH ka use resource ke kisi particular part ko partially update
      karne ke liye kiya jata hai.
    - Yahan hum note ki sirf description update kar rahe hain.
*/

app.patch('/notes/:index',(req,res)=>{


    /*
        NOTE INDEX

        - ":index" ek dynamic route parameter hai.
        - req.params.index se hume pata chalega ki kaunsa note update karna hai.
    */

    const index = req.params.index;


    /*
        NEW DESCRIPTION

        - Client updated description request body me bhejega.
        - req.body.description se hum updated description access kar rahe hain.
    */

    const description = req.body.description;


    /*
        UPDATE NOTE

        - Given index par jo note present hai,
          uski description property ko new description se replace kar rahe hain.
    */

    notes[ index ].description = description;


    /*
        RESPONSE

        - 200 ka matlab hai request successfully process ho gayi.
        - Client ko update successful hone ka message bhej rahe hain.
    */

    res.status(200).json({

        message:"notes updated successfully!"

    })

})


/*
    EXPORT EXPRESS APPLICATION

    - app ko doosri file me use karne ke liye export kar rahe hain.
    - Server ko start karne wali file is exported app ko import karegi.
    - Uske baad wahi file app.listen() ke through server start karegi.
*/

module.exports = app

