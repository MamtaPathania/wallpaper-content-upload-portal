const { deleteData } = require("./deleteRouter.services")

const deleteImgDetails=(req,res)=>{
 deleteData(req,(err,result)=>{
    if (err) {
        console.error("Error delete data:", err);
        return res.status(500).json({ error: "Internal server error", err });
    } else {
        return res.status(200).json(result);
    }
  })
}

module.exports=deleteImgDetails