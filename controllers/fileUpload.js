const File = require('../models/File');
const cloudinary = require('cloudinary').v2;
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


function isFileTypeSupported(type,suppportedType){
    return suppportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
    const options = {
        folder: folder,
        resource_type: "auto",  // selects the file type automatically
    };
    if(quality){
        options.quality = quality;
    }
    
    // options.height = 600;
    // options.width = 800;
    // options.crop = "scale";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload handler
exports.imageUpload = async(req,res)=>{
    try {
        //fetch the media from the request body
        const {name,tags,email} = req.body;
       // console.log(name,tags,email,imageFile);

        const file = req.files.imageFile;
         console.log(file);


        //validation
        const supportFile = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);// this is correct
        if(!isFileTypeSupported(fileType,supportFile)){
            return res.status(400).json({
                succes:false,
                message:"File format not supported"
            });
        }


        //file format supported
        //upload to cloudinary

        const response = await uploadFileToCloudinary(file,"AnandCloud"); // file and folder name of cloudinary
        console.log("File uploaded to cloudinary ",response);
        //save the entry to db
        const fileData  = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        return res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully uploaded"
        });

    } catch (error) {
        console.log("Error in imageUpload function")
        console.log(error);
        return res.status(501).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


exports.videoUpload = async(req,res)=>{
    try {
        // fetch the data
        const { name,email,tags } = req.body;
        console.log( name,email,tags );

        const file = req.files.videoFile;
        
        //validation
        const supportFile = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type: ",fileType);// this is correct

        //TODO: add a upper limit of 5MB for video
        if(!isFileTypeSupported(fileType,supportFile)){
            return res.status(400).json({
                succes:false,
                message:"File format not supported"
            });
        }

        const response = await uploadFileToCloudinary(file,"AnandCloud"); // file and folder name of cloudinary
        console.log("File uploaded to cloudinary ",response);

         //save the entry to db
        const fileData  = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        return res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video Successfully uploaded"
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong in videoUpload function"
        })
    }
}


exports.imageSizeReducer = async (req,res)=>{
    try {
        //fetch the data
        //perform validation
        const { name , tags ,  email } = req.body;


        const file = req.files.imageFile;
         console.log(file);


        //validation
        const supportFile = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);// this is correct

        
        if(!isFileTypeSupported(fileType,supportFile)){
            return res.status(400).json({
                succes:false,
                message:"File format not supported"
            });
        }


        //file format supported
        //upload to cloudinary
     
        const response = await uploadFileToCloudinary(file,"AnandCloud",30); // file and folder name of cloudinary
       
        //   const response = await cloudinary.uploader.upload(
        //     file.tempFilePath,
        //     {
        //         folder: "AnandCloud",
        //         resource_type: "image",
        //         quality: 30,       // reduce quality
        //         height: 500,       // resize height
        //         crop: "scale"      // keep aspect ratio
        //     }
        //   );

        console.log("File uploaded to cloudinary ",response);
        //save the entry to db
        const fileData  = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        return res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully uploaded"
        });

    } catch (error) {
        return res.status(501).json({
            success:false,
            message:"Something went wrong in imageSizeReducer function"
        })
    }
}