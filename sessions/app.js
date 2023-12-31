const express=require('express');
const mongoose =require('mongoose');
const session = require("express-session");

// Package documentation - https://www.npmjs.com/package/connect-mongo
// const session = require('express-session');
const MongoStore=require('connect-mongo')


// Create the express applications
var app = express();

const dbstring='mongodb://localhost:27017/tutorial_db';
const dbOptions={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
const connection = mongoose.createConnection(dbstring,dbOptions);
connection.once("connected",()=>console.log("db connected"))
connection.on("error",()=>console.log(error))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const sessionStore=new MongoStore({
    mongooseConnection:connection,
    collection:"session",
    mongoUrl:'mongodb://localhost:27017/tutorial_db'
});

app.use(session({
    secret:"some secret",
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge:1000*60*60*24 //Age of the session is 1 day
    }
}))
app.get('/',(req,res)=>{
    if(req.session.viewCount){
        req.session.viewCount++;
    }
    else
    {
        req.session.viewCount=1;
    }
    res.send(`you visited the  page ${req.session.viewCount} times`)
})
app.listen(3000)