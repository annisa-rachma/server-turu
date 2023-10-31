const { verifyToken } = require('../helpers/jwt')
const {User, Customer} = require('../models')

const authentication = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token) throw {name : "InvalidToken"}

        const verify = verifyToken(access_token)
        const user = await User.findByPk(verify.id)
        if(!user) throw {name : "InvalidToken"}

        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}

const authenticationCust = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token) throw {name : "InvalidToken"}

        const verify = verifyToken(access_token)
        const customer = await Customer.findByPk(verify.id)
        if(!customer) throw {name : "InvalidToken"}
        if(customer.role !== "customer") throw {name : "InvalidToken"}

        req.user = customer
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {authentication, authenticationCust}