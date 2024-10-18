const express = require('express');
const { DeleteData } = require('./delete.controller'); // Ensure the path is correct
const router = express.Router();

router.route('/delete').post(DeleteData);

module.exports = router;
