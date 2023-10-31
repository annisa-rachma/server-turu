const errHandler = (err, req, res, next) => {
    switch(err.name) {
        case "SequelizeValidationError" :
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message : err.errors[0].message})
            break;
        case "InvalidInput" :
            res.status(400).json({message : "Email or Password cannot empty"});
            break;
        case "InvalidEmail/Password" :
            res.status(401).json({message : "Invalid email or password"});
            break;
        case "NotFound" :
            res.status(404).json({message: "Lodging not found"})
            break;
        case "AlreadyBookmarked" :
            res.status(400).json({message : "Lodging already bookmarked"});
            break;
        case "JsonWebTokenError" :
        case "InvalidToken" : 
            res.status(401).json({message : "Invalid Token"});
            break;
        case "Forbidden" :
            res.status(403).json({message : "Forbidden"});
            break;
        default :
            console.log(err.name)
            res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {errHandler}