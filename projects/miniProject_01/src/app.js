const express = require('express');
const app = express();
//to store all the tasks
const tasks = [];
//client k thru incoming json request ko express parse kar sake iske liye
app.use(express.json());

//POST = getting a task list from the client
app.post('/tasks',(req,res)=>{
    //pushing the task got from client to our server
    tasks.push(req.body);
    //showing the client a scuccess message
    res.status(201).json({
        message: "task created successfully!"
    })
});
//GET = getting back the output from the sercver to the client
app.get('/tasks',(req,res)=>{
    res.status(200).json({
        message: "tasks fetched successfully!",
        tasks: tasks
    })
})
//PATCH = update the existing tasks partially
app.patch('/tasks/:index',(req,res)=>{
    const index = req.params.index;
    tasks[index].completed = req.body.completed;

    res.status(200).json({
        message:"task status updated successfully!"
    })
})
//DELETE = delete an existing task
app.delete('/tasks/:index',(req,res)=>{
    const index = req.params.index
    tasks.splice(index,1)
    res.status(200).json({
        message:"deleted task successfully!"
    })
})

//export the current server to start in the server.js file
module.exports = app;