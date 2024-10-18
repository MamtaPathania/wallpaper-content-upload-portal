const express = require ('express')
const upload = require("../../middleware/Upload");
const { UpdateData } = require('./Update.controller');
const router = express.Router()
// router.route('/get-upload-list').get(UploadData)
router.route('/update').post(upload.single("file"),UpdateData)
module.exports=router