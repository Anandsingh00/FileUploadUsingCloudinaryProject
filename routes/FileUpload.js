const express=require('express');
const router = express.Router();

//imageUpload,videoUpload,imageReducerUpload, yet to be added
const { localFileUpload ,imageUpload, videoUpload ,imageSizeReducer} = require('../controllers/fileUpload');

router.post('/localFileUpload',localFileUpload);
router.post('/imageUpload',imageUpload);
router.post('/imageSizeReducer',imageSizeReducer);

router.post('/videoUpload',videoUpload);


module.exports = router;