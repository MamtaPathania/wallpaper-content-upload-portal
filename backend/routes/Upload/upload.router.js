const express = require('express');
const { UploadData, DownloadCountController } = require('./upload.controller');
const upload = require('../../middleware/Upload');
const router = express.Router()
router.route('/post-image').post(upload.single("file"), (req, res) => {
    console.log("Post-image route hit");
    UploadData(req, res);
  });

  router.post('/downloads-count',DownloadCountController)
  
module.exports=router;