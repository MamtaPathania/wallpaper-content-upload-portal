const { error } = require('console');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,"public/images")
  },
  filename:(req,file,callback)=>{
    const fileExtension =path.extname(file.originalname);
    const originalNameWithoutExt = path.basename(
     file.originalname,
     fileExtension
    );
    const fileName =
    Date.now().toString() + "-" + originalNameWithoutExt + fileExtension;

    callback(null,fileName);
  },
});


const upload=multer({
    storage:storage,
    // limits:{
    //     fileSize : 5 * 1024 * 1024,
    // },
    fileFilter: (req, file,callback)=>{
        const allowedTypes=["image/jpg","image/jpeg","image/png"]
        if(allowedTypes.includes(file.mimetype)){
            console.log("==========",file)
            callback(null,true)
        }else{
            callback(new Error("Invalid file type"),false)
        }
    },
})

module.exports=upload