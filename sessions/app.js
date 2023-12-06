const express=require('express');
const mongoose =require('mongoose');
const session = require("express-sessions");

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore=require('connect-mongo')(session);

// Create the express applications
var app = express();

const dbstring='mongodb://localhost:27017/tutorial_db';
const dbOptions={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
const connection = mongoose.createConnection(dbstring,dbOptions);
connection.on("connected",()=>console.log("db connected"))
connection.on("error",()=>console.log(error))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const sessionStore=new MongoStore({
    mongooseConnection:connection,
    collection:"session"
});

app.use(session({
    secret:"some secret",
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge:1000*60*60*24
    }
}))
app.get('/',(req,res)=>{
    res.send('<h1>dfaf</h1>')
})
app.listen(4000)