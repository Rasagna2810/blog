const exp=require('express');
const app=exp();
const mongoose = require('mongoose');
const ua =require('./APIs/userapi')
const ada=require('./APIs/adminapi')
const aua=require('./APIs/authorapi')
const cors=require('cors')
app.use(cors())
require('dotenv').config();//this config() method is used to load environment variables from a .env file into process.env in a Node.js application. 
//->process.env is a global object in Node.js that stores environment variables as key-value pairs.
 const port=process.env.PORT||4000;// if env is unable to provide port we use 4000
//  generally take env keys in uppercase

// db connection
mongoose.connect(process.env.DBURL)
    .then(()=>app.listen(port,()=>console.log(`server is listening to the port ${port}`)))
    .catch(err=>console.log("Error",err)) //without db no use of server so we written app.listen inside
    //then here instead of try catch we used then cause here connection is a type of promise
// body parser middleware
app.use(exp.json())
// connect api routes
app.use('/user-api',ua)
app.use('/author-api',aua)
app.use('/admin-api',ada)

// error handler
app.use((err,req,res,next)=>{
    console.log("err object in express error handler :",err)
    res.send({message:err.message})
})

