//core modules
require('dotenv').config();
const path = require('path');

// externel modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoItemsRouter = require('./routes/todoItemsRouter');
const errorController = require('./controllers/error');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use("/api/todo", todoItemsRouter);
app.use(errorController.pageNotFound);

//MONGO DB CONNECTION
const DB_PATH = process.env.MONGO_URI;

const port = 5002;
mongoose.connect(DB_PATH).then(() =>{
    console.log("connect to mongoose")
    app.listen(port, () =>{
    console.log(`server running at http://localhost:${port}`);
});
}).catch(err =>{
    console.log("error while connecting to mongoose",err);
})
