const { userUploadedImg, CategoryDetails, downloadDetails, fetchAllCategory} = require("./getUploadedImages.services");

const getUpload=(req,res)=>{
  userUploadedImg(req,(err,result)=>{
    if (err) {
        console.error("Error getting imges:", err);
        return res.status(500).json({ error: "Internal server error", err });
    } else {
        return res.status(200).json(result);
    }
  })
}

const showCategoryData=(req,res)=>{
  CategoryDetails(req,(err,result)=>{
    if (err) {
        console.error("Error getting category:", err);
        return res.status(500).json({ error: "Internal server error", err });
    } else {
        return res.status(200).json(result);
    }
  })
}

const downloadCount=(req,res)=>{
downloadDetails(req,(err,result)=>{
  if (err) {
      console.error("Error getting category:", err);
      return res.status(500).json({ error: "Internal server error", err });
  } else {
      return res.status(200).json(result);
  }
})
}

const fetchCategoryController=(req,res)=>{
  fetchAllCategory(req,(err,result)=>{
    if (err) {
      console.error("Error getting category:", err);
      return res.status(500).json({ error: "Internal server error", err });
  } else {
      return res.status(200).json(result);
  }
  })
}




module.exports={getUpload,showCategoryData,downloadCount,fetchCategoryController}