


const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const pool = require('../../database');
const s3 = require('../../middleware/s3Client');

module.exports = {
  DeleteData: async (req, res) => {
    const { id, image } = req.body; // Extract id and image URL from the request body
    console.log('id:', id);
    console.log('image:', image);

    if (!id || !image) {
      return res.status(400).send('ID and image URL are required');
    }

    try {
      // Delete the record from the database
      const query = process.env.DELETE_DATA_BY_ID;
      pool.query(query, [id], async (error, results) => {
        if (error) {
          console.error('Error deleting record:', error);
          return res.status(500).send('Error deleting record');
        }

        if (results.affectedRows === 0) {
          return res.status(404).send('No record found with the given ID');
        }

        // Since `image` is expected to be a path, not a full URL, use it directly
        const imageKey = image; 

        // Delete the image from AWS S3
        const params = {
          Bucket: process.env.S3_BUCKET_NAME, // Replace with your actual S3 bucket name
          Key: imageKey // Construct the path to the object in the bucket
        };

        console.log(params, 'params, dv');
        try {
          const command = new DeleteObjectCommand(params);
          const data = await s3.send(command);

          console.log('S3 DeleteObject response:', data);

          if (data.$metadata.httpStatusCode === 204) {
            console.log('Image deleted from S3 successfully');
            return res.send('Record and image deleted successfully');
          } else {
            console.error('Unexpected S3 response:', data);
            return res.status(500).send('Failed to delete image from S3');
          }
        } catch (s3Error) {
          console.error('Error deleting image from S3:', s3Error);
          return res.status(500).send('Record deleted but failed to delete image from S3');
        }
      });
    } catch (err) {
      console.error('Error handling request:', err);
      return res.status(500).send('Internal server error');
    }
  }
};
