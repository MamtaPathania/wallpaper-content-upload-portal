
const {GetUploadData,PostUpdateData}=require('./Update.services')
module.exports={
    UploadData:(req,res)=>{
        const data = req.body 
        GetUploadData(data,(err,result)=>{
            if(err){
                console.log(err)
                res.status(400).json({error:err})
            }
            res.json({result})
        })
    },
   
   

      UpdateData: async (req, res) => {
        PostUpdateData(req, (err, result) => {
          if (err) {
            res.status(400).json({ err: err });
            return;
          } else {
            res.status(200).json({ result });
          }
        });
      },
    
}

