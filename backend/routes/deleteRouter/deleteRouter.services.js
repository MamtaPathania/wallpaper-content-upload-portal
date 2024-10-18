const pool=require('../../database')
module.exports={
    deleteData:(req,callack)=>{
        const {id}=req.body
        const deleteQuery=process.env.delete_query
        console.log(deleteQuery,"deletequery==")
        pool.query(deleteQuery,[id],(deleteErr,deleteResult)=>{
            if(deleteErr){
                return callack(deleteErr,null)
            }
            return callack(null,{message:"deleted data successfully"})
        })

    }
}