const path = require("path");
const pool = require("../../database");

module.exports = {
  userUploadedImg: (req, callback) => {
    const getImgQuery = process.env.get_images;
    console.log(getImgQuery, "====query");
    pool.query(getImgQuery, [], (err, result) => {
      if (err) {
        console.log(err, "error");
        return callback(err, null);
      } else {
        return callback(null, result);
      }
    });
  },

  CategoryDetails: (req, callback) => {
    const { category } = req.body;
    const getcatQuery = process.env.category_data;
    console.log(getcatQuery, "====query");
    pool.query(getcatQuery, [category], (caterr, catresult) => {
      if (caterr) {
        console.log(caterr, "error");
        return callback(caterr, null);
      } else {
        return callback(null, catresult);
      }
    });
  },
  fetchAllCategory:(req,callback)=>{
    const categoryQuery=process.env.fetch_category
    pool.query(categoryQuery,[],(caterr,catresult)=>{
      if (caterr) {
        console.log(caterr, "error");
        return callback(caterr, null);
      } else {
        return callback(null, catresult);
      }
    })
  },

  downloadDetails:(req,callback)=>{
    const {image_id,url}=req.body

  const checkImageQuery = process.env.check_image
  
  pool.query(checkImageQuery, [image_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking image:", checkErr);
      return callback(checkErr, '');
    }
    if (checkResult.length > 0) {
      const updateCountQuery = "UPDATE tbl_downloads_count SET count = count + 1 WHERE image_id = ?";
      
      pool.query(updateCountQuery, [image_id], (updateErr, updateResult) => {
        if (updateErr) {
          console.error("Error updating count:", updateErr);
          return callback(updateErr, '');
        }
        return callback('', { message: "Count updated successfully" });
      });
      
    } else {
      const insertQuery = "INSERT INTO tbl_downloads_count (url, count, image_id, date) VALUES (?, 1, ?, now())";
      
      pool.query(insertQuery, [url, image_id], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error inserting new image entry:", insertErr);
          return callback(insertErr, '');
        }
        return callback('', { message: "New entry added successfully" });
      });
    }
  });
}
}
