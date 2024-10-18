const { updateImageDetails } = require("./updateImageRouter.controller");

const router = require('express').Router();

router.post("/", updateImageDetails);

module.exports = router;
