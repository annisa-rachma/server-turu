const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { Lodging, Type, User } = require('../models')
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async registerUser(req, res, next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body
            const user = await User.create({username, email, password, phoneNumber, address})
            res.status(201).json({message : "succesfully registered" , user})
        } catch (err) {
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email || !password) throw { name : "InvalidInput" }
    
            const user = await User.findOne({where : {email}})
            if(!user) throw {name : "InvalidEmail/Password"}
            
            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword) throw {name : "InvalidEmail/Password"}
            
            const access_token = signToken({id:user.id})
            res.status(200).json({access_token, id: user.id, username: user.username, role:user.role});
        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const {google_token} = req.headers;
            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID,  
            });

            const [user, created] = await User.findOrCreate({
                where: {email : ticket.payload.email},
                defaults: {
                    email: ticket.payload.email,
                    username: ticket.payload.given_name,
                    password: Math.random() * 12345,
                    role: "staff"
                },
                hooks: false
            })

            const access_token = signToken({
                id: user.id
            })
            res.status(200).json({access_token, id: user.id, username: user.username, role:user.role});

        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = UserController