"use strict";

const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UserSchema = require('./UserSchema')

server.use(cors());

const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/book", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.get("/", (req, res) => {
  res.send("Home Route");
});

server.get('/user', handleResponse)
server.get('/books', handleBookResponse)

//http://localhost:3001/user?email=osqadoomy@gmail.com
function handleResponse (req, res){
  let emailAddress = req.query.email
  UserSchema.find({email: emailAddress}, function(error, userdata){
    if(error){
      res.send(error)
    } else{
      res.send(userdata[0].email)
    }
  })
}


// http://localhost:3001/books?email=osqadoomy@gmail.com
function handleBookResponse (req,res) {
  let emailAddress = req.query.email
  UserSchema.find({email: emailAddress}, function(error, userdata){
    if(error){
      res.send(error)
    } else{
      res.send(userdata[0].books)
    }
  })
}



// const bookName = new myUserModel({name: "hello"})
// console.log(bookName)


//   books.save();
// console.log(books)
// seedUserCollection();

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
