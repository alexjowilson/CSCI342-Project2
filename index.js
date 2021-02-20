const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


const app = express()                                   // create instance of express app
app.set('view engine', 'ejs')                           // set ejs to be the view engine for the app
app.use(express.static(__dirname + '/public'));         // indicate the directory with public facing resources


const MAX_UPLOAD_SIZE = 10; // max file size that the server will accept.


// configure the storage engine
const storage = multer.diskStorage({
        // can be replaced with a function like filename which dynamically detemmines where the file will be stored.
        destination: "./user-images/",

        // determines what the name of of the uploaded file will be.
        filename: function(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
        }
});

// configure the upload mechanism
const upload = multer({
        storage: storage,
        limits: {fileSize: 1024 * 1024 * MAX_UPLOAD_SIZE},
        fileFilter: function(req, file, cb) {
                checkFileType(file, cb);
        }
}).single('myImage');



