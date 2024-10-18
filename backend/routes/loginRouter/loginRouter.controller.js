
const {userlogindetails}=require('./loginRouter.services')
const getlogindetails = (req, res) => {
    userlogindetails(req, (err, result) => {
        if (err) {
            console.error("Error during login:", err);
            return res.status(500).json({ error: "Internal server error", err });
        } else {
            return res.status(200).json(result);
        }
    });
};


    module.exports={getlogindetails}
