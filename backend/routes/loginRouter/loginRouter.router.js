const {getlogindetails}=require('./loginRouter.controller')
const express = require('express')
const router = express.Router();


router.post('/login',getlogindetails)

module.exports = router;
