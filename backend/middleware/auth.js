const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    console.log("Auth middleware - Token received:", token ? "Token exists" : "No token");

    if (!token){
        return res.status(401).json({ success: false, message: 'No token provided' });  
    }

    // if token is present, verify it
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified successfully, userId:", decoded.id);
        // attach decoded user info directly to request object
        req.userId = decoded.id;
        // proceed to next middleware or route handler
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

}

module.exports = authMiddleware; // authUser