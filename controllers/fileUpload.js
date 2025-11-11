const File = require('../models/File');

exports.localFileUpload =  async(req,res)=>{
    try {

        //fetch file from request body
        const file = req.files.file;
        console.log("File from Request body: ",req.files);

        //create path where file need to be stored on the server
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(`Path:${path}`);
        
        //add path to move function
        file.mv(path, (error)=>{
            console.log(error);
        });

        //create a succesful response
        return res.status(201).json({
            success:true,
            message:"Local File uploaded successfully"
        })
    } catch (error) {
        console.log("Error in localfileUpload function");
        console.log(error);
    }
}