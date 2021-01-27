// authMiddleware проверяет токен на наличие и валидирует его.
const jwt = require('jsonwebtoken');

module.exports = (req, res,next) =>{
    const header = req.headers['authorization'];
    if(!header){
        return res.status(401).json({message: "No authorized header found"});
    }

    const [type, token] = header.split(' ');
    if(!token){
        return res.status(401).json({message: "No authorized token in header found"});
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    req.token = token;
        next();
}