const express=require('express');
const router = express.Router();

//imageUpload,videoUpload,imageReducerUpload, yet to be added
const { localFileUpload } = require('../controllers/fileUpload');

router.post('/localFileUpload',localFileUpload);

module.exports=router;