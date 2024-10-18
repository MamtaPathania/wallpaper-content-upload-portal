// controllers/uploadController.js

const path = require("path");
const multer = require("multer");
const pool = require("../../database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Error: Images only");
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: fileFilter,
});

const imGaeUploader = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).send(err);
    }

    const name = req.body.name;
    const category = req.body.category;
    if (!req.file) {
      return res.status(400).send("No file uploaded or file type is invalid.");
    }
console.log(name,"name")
console.log(category,"category")
   

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    
    const query = process.env.image_upload
    pool.query(query, [name,category, imageUrl], (dbErr, result) => {
      if (dbErr) {
        console.error("Database insertion error:", dbErr);
        return res.status(500).send("Error saving image metadata");
      }

      res.send({
        message: "File and name successfully uploaded",
        imageUrl: imageUrl,
        name: name,
        category:category,
      });
    });
  });
};

module.exports = {
  imGaeUploader,
};
