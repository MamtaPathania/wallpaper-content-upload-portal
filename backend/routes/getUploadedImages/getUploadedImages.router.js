const express = require('express')
const { getUpload, showCategoryData, downloadCount, fetchCategoryController} = require('./getUploadedImages.controller')
const router = express.Router()


router.post('/',getUpload)//to get acc to category
router.post('/category',showCategoryData)
router.post('/downloads',downloadCount)
router.get('/fetch-categories',fetchCategoryController)

module.exports = router