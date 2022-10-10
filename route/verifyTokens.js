
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, "7dd01b4b40b6b5c7f553a9dfdaf22fce54f22ea8", (err, user) => {
            if(err) res.status(401).json("invalid token")
            req.user = user
            next()
        })
    } else {
        return res.status(401).json("youre not authorized")
    }
}

const verifiedAccessToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id == req.params.id || req.user?.isAdmin == process.env.ISADMIN){
            next()
        } else {
            return res.status(401).json("unauthorized to update post")
        }
    })
}
const verifiedAdminToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if((req.user.id == req.params.id) && (req.user.isAdmin == process.env.ISADMIN)){
            next()
        } else {
            return res.status(401).json("unauthorized to update product")
        }
    })
}

module.exports = {verifiedAccessToken, verifiedAdminToken};