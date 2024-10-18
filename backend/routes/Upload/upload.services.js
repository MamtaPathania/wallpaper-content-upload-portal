const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const pool = require("../../database");
const fs = require("fs").promises;
const s3Client = require("../../middleware/s3Client");
const path = require("path");
// const { call } = require('react-native-reanimated');
// const { count } = require('console');

module.exports = {
  PostUploadData: async (req, callback) => {
    console.log(req.file, "file....");
    if (!req?.file) {
      return callback("No file uploaded.");
    }

    try {
      const file = req.file.filename;
      const outputDir = path.join(__dirname, "../../public/images", file);

      const { name, category } = req.body;
      console.log("Request body:", req.body);

      // Read the file content asynchronously
      const fileContent = await fs.readFile(outputDir);
      console.log(fileContent, "File content");
      if (!fileContent) {
        throw new Error("File content could not be read.");
      }

      const key = `${process.env.S3_FILE_PATH_NAME}/${file}`;
      console.log(key, "S3 key");

      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: req.file.mimetype, // Set the content type to image/jpeg or the appropriate mimetype

      };

      // Upload file to S3 using the PutObjectCommand
      const command = new PutObjectCommand(params);

      try {
        const data = await s3Client.send(command);
        // console.log(`File uploaded successfully to S3. Location: ${key}`);

        // Construct the S3 file URL (not used as the key)
        const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        console.log("File uploaded successfully to S3. Location: ",fileUrl);

        // Save the file URL and other details to the database
        const query = process.env.POST_UPLOAD_DATA;

        pool.query(query, [name, category, fileUrl], (err, result) => {
          if (err) {
            console.error("Error saving to database:", err);
            return callback("Error saving images to the database.");
          }

          callback(null, {
            message: "Image uploaded successfully.",
            fileUrl
          });
        });

        await removeFile(outputDir); // Remove local file after successful upload
      } catch (err) {
        console.error("Error uploading file to S3:", err);
        await removeFile(outputDir); // Remove local file on error
        return callback("Error uploading file to S3.");
      }

    } catch (error) {
      console.error("Error processing upload:", error);
      await removeFile(req.file.path); // Ensure file is removed on catch block as well
      callback("Error processing the upload.");
    }
  },

  DownloadCountData:async(req,callback)=>{
    const {image_id}=req.body
    const countQuery=process.env.get_download_count
    pool.query(countQuery,[image_id],(countErr,countResult)=>{
      if (countErr){
        console.log(countErr,"error fetching dowwnloads count")
        return callback(countErr,null)
      }
      return callback(null,countResult)
    })
  }
};

// Utility function to remove a file
function removeFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath)
      .then(() => {
        console.log(`File ${filePath} removed successfully.`);
        resolve();
      })
      .catch((err) => {
        console.error(`Error removing file ${filePath}:`, err);
        reject(err);
      });
  });
}
