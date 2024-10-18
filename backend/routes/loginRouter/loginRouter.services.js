const pool=require('../../database')
module.exports={
    userlogindetails:(req,callback)=>{
        const {username,password}=req.body;
        console.log(req.body,"===req")
    
        const get_login_data=process.env.SELECT_LOGIN_QUERY
        
        console.log("=====login",get_login_data)
    
        
        pool.query(get_login_data, [username, password], (err, result) => {
            if (err) {
                return callback(err);
            }
            if (result.length === 0) {
                return callback("Incorrect username or password");
            }
            const response = {
                message: "Login successfully",
            };
            return callback(null, response);
        });
        
     },
}