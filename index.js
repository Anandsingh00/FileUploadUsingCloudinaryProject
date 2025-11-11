const express = require('express');
const app = express();
require('dotenv').config();


//define the port
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
const fileUpload=require('express-fileupload');
app.use(fileUpload());

//connect to db
const db = require("./config/database");
db.connect();

//connect to cloudinary
const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();



//api mount
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload',Upload);

//activate server
app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`);
})