const { Lodging, User } = require('../models')

const authorization = async (req, res, next) => {
    try {
        const lodging = await Lodging.findOne({where : {id : req.params.id}})
        if(!lodging) throw {name : "NotFound"} 

        if(req.user.role !== "admin" && (lodging.authorId !== req.user.id)) {
            throw {name : "Forbidden"}
        } 
        next()
    } catch (err) {
        next(err)
    }
}

const authorizationForStatus = async (req, res, next) => {
    try {
        const lodging = await Lodging.findOne({where : {id : req.params.id}})
        if(!lodging) throw {name : "NotFound"} 

        if(req.user.role !== "admin") {
            throw {name : "Forbidden"}
        } 
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = {
    authorization,
    authorizationForStatus
}