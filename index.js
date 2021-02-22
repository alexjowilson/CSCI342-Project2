const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


const app = express()                                   // create instance of express app
app.set('view engine', 'ejs')                           // set ejs to be the view engine for the app
app.use(express.static(__dirname + '/public'));         // indicate the directory with public facing resources

const PORT = 3001;          // express server port number
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

// check upload file type
function checkFileType(file, cb){
        const filetypes = /jpeg|png|jpg|gif/;
        var mimetype = filetypes.test(file.mimetype);
        var filetype = filetypes.test(path.extname(file.originalname).toLowerCase());
        if(mimetype && filetype){
                return cb(null,true);
        }
        else{
                console.log("Error this filetype: "+filetype+" is invalid. Upload images only please!")
                cb("Error, upload images only please!");
        }
}



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.get('/', (req, res) => res.render('index',{msg: "Hello, World!"}));
app.get('/searchYourself.ejs', (req, res) => res.render('searchYourself'))
app.post('/upload', (req, res) =>{
        upload(req, res, (err) => {
            if(err){
                res.render('index', {
                        msg:err
                });
            }
            else if(req.file == undefined){
                res.render('index', {
                        msg: 'Error: No file selected!'
                });
            }
            else{
                res.render('index', {
                        msg: 'File Uploaded!',
                        file: `uploads/${req.file.filename}`
                });    
            }    
        });
});