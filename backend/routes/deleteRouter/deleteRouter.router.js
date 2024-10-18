const express=require('express')
const deleteImgDetails = require('./deleteRouter.controller')
const router=express.Router()

router.post('/',deleteImgDetails)
module.exports=router