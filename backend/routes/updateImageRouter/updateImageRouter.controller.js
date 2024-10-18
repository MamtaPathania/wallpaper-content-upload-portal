

const path = require("path");
const multer = require("multer");
const pool = require("../../database");

// Setup multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
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
const updateImageDetails = (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
  
    // Handle file upload first
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).send(err);
      }
  
      const { id, name, category } = req.body;
      let fileUrl = null;
  
      if (!id) {
        return res.status(400).send("ID is required.");
      }
  
      if (req.file) {
        fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      }
  
      // First, fetch current data from the database
      pool.query("SELECT name, category, url FROM images WHERE id = ?", [id], (selectErr, results) => {
        if (selectErr) {
          console.error("Database fetch error:", selectErr);
          return res.status(500).send("Error fetching image metadata");
        }
  
        if (results.length === 0) {
          return res.status(404).send("Image not found.");
        }
  
        const currentData = results[0];
        const updatedName = name || currentData.name;
        const updatedCategory = category || currentData.category;
        const updatedUrl = fileUrl || currentData.url;
  
        // Update only provided fields
        const query = "UPDATE images SET name = ?, category = ?, url = ? WHERE id = ?";
        pool.query(query, [updatedName, updatedCategory, updatedUrl, id], (dbErr, result) => {
          if (dbErr) {
            console.error("Database update error:", dbErr);
            return res.status(500).send("Error updating image metadata");
          }
  
          res.send({
            message: "Image details successfully updated",
            id,
            name: updatedName,
            category: updatedCategory,
            image: updatedUrl || "No new image uploaded",
          });
        });
      });
    });
  };
  
  
  module.exports = {
  updateImageDetails,
};