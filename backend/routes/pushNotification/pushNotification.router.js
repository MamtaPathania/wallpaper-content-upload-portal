const express = require('express');
const { getLatestImages } = require('./pushNotification.controller');
const router=express.Router()

router.post('/latest-image',getLatestImages)

module.exports=router;