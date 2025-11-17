const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,

    }
});

//post middleware
fileSchema.post("save",async function (doc) { //doc refers to the entry saved in DB
        try {
            console.log("DOC:",doc);
            console.log("MAIL_USER =", process.env.MAIL_USER);
            console.log("MAIL_PASS =", process.env.MAIL_PASS ? "LOADED" : "NOT LOADED");


            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                }
            })

            //send mail
            let info= await transporter.sendMail({
                from:"Anand",
                to:doc.email,
                subject:"New File Uploaded on Cloudinary",
                html:`<h2>Hello Jee</h2><p>File Uploaded</p>view here: <a href="#{doc.imageUrl}">${doc.imageUrl}</a>`,
            });
            console.log("Info:",info);

        } catch (error) {
            console.log(error);

        }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;