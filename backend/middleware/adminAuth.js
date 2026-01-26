const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
try {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success:false, message:'Unauthorized access'});
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            if(token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD){
        return res.status(401).json({success:false, message:'Unauthorized access'});
    }
    next();
} catch (error) {
    console.log(error);
    res.status(401).json({success:false, message:error.message});
}

}

module.exports = adminAuth;