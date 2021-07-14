"use strict";

const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const UserSchema = require('./UserSchema')

server.use(cors());

const PORT = 3001;
server.use(express.json())

mongoose.connect("mongodb://localhost:27017/book", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.get("/", (req, res) => {
  res.send("Home Route");
});

server.get('/user', handleResponse)
server.get('/books', handleBookResponse)
server.post('/books', addBookResponse)


function addBookResponse(req, res) {
  console.log(req.body)
  let { bookName, bookDesc, bookStatus } = req.body;
  let emailAddress = req.query.email

  UserSchema.find({ email: emailAddress }, (error, userdata) => {
    if (error) { res.send('cant find user') }
    else {
      console.log('before adding', userdata)
      userdata[0].books.push({
        name: bookName,
        description: bookDesc,
        status: bookStatus
      })
      console.log('after adding', userdata[0])
      userdata[0].save()
      res.send(userdata[0].books)
    }
  })

}

// server.get('/books', handleBookResponse)
// localhost:3001/deleteCat/1?ownerName=razan
server.delete('/books/:bookId',deleteBookHandler)

function deleteBookHandler(req,res) {
  console.log('deeeeeee');
  console.log(req.params.bookId);
  console.log(req.query)

  let index = Number(req.params.bookId);
  console.log(index)
  let emailAddress = req.query.email;
  myOwnerModel.find({email: emailAddress},(error,userdata)=>{
      if(error) {res.send('cant find user')}
      else{
         console.log('before deleting',userdata[0].books)

         let newBooksArr = userdata[0].books.filter((book,idx)=>{
            //  if(idx !== index) {return book}
          return idx!==index
         })
         userdata[0].books=newBooksArr
         console.log('after deleting',userdata[0].books)
         userdata[0].save();
         res.send(userdata[0].books)
      }

  })
}










//http://localhost:3001/user?email=osqadoomy@gmail.com
function handleResponse(req, res) {
  let emailAddress = req.query.email
  UserSchema.find({ email: emailAddress }, function (error, userdata) {
    if (error) {
      res.send(error)
    } else {
      res.send(userdata[0].email)
    }
  })
}


// http://localhost:3001/books?email=osqadoomy@gmail.com
function handleBookResponse(req, res) {
  let emailAddress = req.query.email
  UserSchema.find({ email: emailAddress }, function (error, userdata) {
    if (error) {
      res.send(error)
    } else {
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
