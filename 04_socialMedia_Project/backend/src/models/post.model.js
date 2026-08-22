const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
})

const postModel = mongoose.model("post",postSchema)

/* 
post = {
image: string,
caption:string
}

user = {
name:string,
email:string,
password:string,
posts:[post1,post2,post3]
}

*/
module.exports = postModel;