const {PostUploadData, DownloadCountData}=require('./upload.services')
module.exports={
    UploadData: async (req, res) => {
        PostUploadData(req, (err, result) => {
          if (err) {
            res.status(400).json({ err: err });
            return;
          } else {
            res.status(200).json({ result });
          }
        });
      },
      DownloadCountController:async(req,res)=>{
        DownloadCountData(req,(err,result)=>{
          if (err) {
            res.status(400).json({ err: err });
            return;
          } else {
            res.status(200).json({ result });
          }
        })
      }
     
}
    
