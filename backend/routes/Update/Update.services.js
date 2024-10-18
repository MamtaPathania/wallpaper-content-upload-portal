const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const pool = require("../../database");
const fs = require("fs").promises;
const s3Client = require("../../middleware/s3Client"); // Assuming you have your s3Client in middleware
const path = require("path");

module.exports = {
  PostUpdateData: async (req, callback) => {
    console.log(req.file, "file....");
    if (!req?.file) {
      return callback("No file uploaded.");
    }

    try {
      const file = req.file.filename;
      const outputDir = path.join(__dirname, "../../public/images", file);

      const { id, name, category } = req.body;
      console.log("Request body:", req.body);


      const updatequery=process.env.SELECT_DATA_BY_ID;
      pool.query(updatequery,[id],async(err,result)=>{
        if(err){
          console.log(err,"==error updationg data")
          return result.status(400).json({message:"some eror occured"})
        }
        console.log(result,"result-------")
        if(result.length > 0){
          console.log(result[0].url)
          const image=result[0].url;


             
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
        ContentType: req.file.mimetype,
      };

      // Upload file to S3 using PutObjectCommand
      const command = new PutObjectCommand(params);

      try {
        const data = await s3Client.send(command);

        // Construct the S3 file URL
        const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        console.log("File uploaded successfully to S3. Location: ", fileUrl);

        // Save the new file URL and other details to the database
        if (!id) {
          return callback("ID is required to update the record.");
        }

        const updateQuery = process.env.UPDATE_DATA_QUERY; // Make sure to define this in your .env or replace it with your SQL

        pool.query(updateQuery, [fileUrl, name, category, id], async (err, result) => {
          if (err) {
            console.error("Error saving to database:", err);
            return callback("Error updating image details in the database.");
          }

          // If the update is successful and an old image URL is provided, delete the old image from S3
          if (image) {
            const url = new URL(image);
            const imageiKey = url.pathname.substring(1); 


            const deleteParams = {
              Bucket: process.env.S3_BUCKET_NAME,
              // Key: oldKey,
              Key:imageiKey
            };

            console.log(deleteParams,"=====deltee")

            const deleteCommand = new DeleteObjectCommand(deleteParams);
            try {
              // await s3Client.send(deleteCommand);
              const data = await s3Client.send(deleteCommand);

              console.log('S3 DeleteObject response:', data);
    
              if (data.$metadata.httpStatusCode === 204) {
                console.log('Image deleted from S3 successfully');
                return callback('',{ message: 'Record and image deleted successfully' });
              } else {
                console.error('Unexpected S3 response:', data);
                return callback({ error: 'Failed to delete image from S3' });
              }
              // console.log("Old image deleted successfully from S3.");
            } catch (err) {
              console.error("Error deleting the old image from S3:", err);
            }
          }

          // Callback with success message
          callback(null, {
            message: "Image updated successfully.",
            fileUrl,
          });
        });

        await removeFile(outputDir); // Remove local file after successful upload
      } catch (err) {
        console.error("Error uploading file to S3:", err);
        // await removeFile(outputDir); // Remove local file on error
        return callback("Error uploading file to S3.");
      }

    } 
      })
          }

          catch (error) {
            console.error("Error processing upload:", error);
            await removeFile(req.file.path); // Ensure file is removed on catch block as well
            callback("Error processing the upload.");
          }
  
  },
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
