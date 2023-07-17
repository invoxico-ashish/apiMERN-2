const jwt = require("jsonwebtoken");

const userAuth = async(req,rea,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader ||!authHeader.startWith('Bearer'))                                                                                                                                                                                                                                                                                                               {
        next("Auth failed")
    }
    const token = authHeader.splite(" ")[1]
    try{
const payloads = jwt.verify(token,process.env.SECRET_KEY);
    }catch(err){
        console.log(err)
        next("Auth failed")
    }
}