const pool = require("../../database"); 

exports.getImagesUploadedToday = (callback) => {
  const query = process.env.latest_uploaded_images
console.log(query,"====get push notification========")
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error,"===error fetching data===")
      return callback(error, null);
    }
    return callback(null, results);
  });
};
