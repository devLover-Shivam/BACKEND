const express = require('express');
//creates and stores an instance of express server into app variable
const app = express();

//setting response over a request
app.get("/",(req,res)=>{
    res.send("Hello World");
})

// req = koi bhi request jo frontend backend se karta hai
// res = response sent by the backend to the frontend
app.get("/about",(req,res) =>{
    res.send("About Page");
})
//starting server
app.listen(3000) // 3000 = port number