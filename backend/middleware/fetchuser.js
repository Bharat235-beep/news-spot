const jwt = require('jsonwebtoken');
const JWT_SECRET = "Bharat@24";
const fetchuser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send("Please authaunicate using a valid token")
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send("Please authaunicate using a valid token")
}
}
module.exports=fetchuser