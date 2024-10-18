const { imGaeUploader } = require("./image-uploader.controller");

const router = require("express").Router();

router.post("/", imGaeUploader);

module.exports = router;
