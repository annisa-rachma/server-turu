const { Lodging, Type, User, History } = require('../models')
class Controller {
    static async getAllLodging(req, res, next) {
        try{
            const lodging = await Lodging.findAll({
                include: [
                    {   model: User,
                        attributes : {
                            exclude : ['password']
                        }
                    }
                  ],
                order : [['id', 'DESC']]
            })
            res.status(200).json({lodging})
        }
        catch(err) {
            next(err)
        }
    }

    static async postLodging(req, res, next) {
        try{
            const lodging = await Lodging.create({...req.body, authorId: req.user.id, status: 'Active'})
            await History.create({
                lodgingName : lodging.dataValues.name,
                description : `New entity with id ${lodging.dataValues.id} created`,
                updatedBy : req.user.username
            })
            res.status(201).json({message: `Successfully added lodging with name ${lodging.name}`, lodging})
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async getLodgingById(req, res, next) {
        try {
            const lodging = await Lodging.findOne({where : {id : req.params.id}})
            if(!lodging) throw {name : "NotFound"} 
            res.status(200).json({lodging})
        } catch (err) {
            next(err)
        }
    }

    static async putLodging(req, res, next) {
        try{
            const {name, facility, roomCapacity, imgUrl, location, price, typeId} = req.body
            const lodging = await Lodging.findOne({where : {id : req.params.id}})
            await Lodging.update({
                name,
                facility, 
                roomCapacity, 
                imgUrl, 
                location, 
                price, 
                typeId
            }, {
                where : {id : req.params.id}
            })
            await History.create({
                lodgingName : lodging.dataValues.name,
                description : `Entity with id ${lodging.dataValues.id} updated`,
                updatedBy : req.user.username
            })
            res.status(200).json({message: `Succesfully edited lodging with id ${req.params.id}`})
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async patchStatusLodging(req, res, next) {
        try{
            const lodging = await Lodging.findOne({where : {id : req.params.id}})
            await Lodging.update({status: req.body.status}, {
                where : {id : req.params.id}
            })
            await History.create({
                lodgingName : lodging.dataValues.name,
                description : `Entity status with id ${lodging.dataValues.id} has been updated from ${lodging.dataValues.status} into ${req.body.status}`,
                updatedBy : req.user.username
            })
            res.status(200).json({message: `Succesfully edited status with id ${req.params.id}`})
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async deleteLodgingById(req, res, next) {
        try {
            const lodging = await Lodging.findOne({where : {id : req.params.id}})
            
            await Lodging.destroy({where : {id : req.params.id}})
            res.status(200).json({message : `success to delete ${lodging.name}`})  
        } catch (err) {
            next(err)
        }
    }

    static async getAllType(req, res, next) {
        try{
            const type = await Type.findAll({order : [['id']]})
            res.status(200).json({type})
        }
        catch(err) {
            next(err)
        }
    }

    static async postType(req, res, next) {
        try{
            const typeAdded = await Type.create(req.body)
            res.status(201).json({message: `Successfully added new type`, typeAdded})
        }
        catch(err) {
            next(err)
        }
    }

    static async getTypeById(req, res, next) {
        try {
            const type = await Type.findOne({where : {id : req.params.id}})
            if(!type) throw {name : "NotFound"} 
            res.status(200).json({type})
        } catch (err) {
            next(err)
        }
    }

    static async putType(req, res, next) {
        try{
            const type = await Type.update({name: req.body.name}, {
                where : {id : req.params.id}
            })
            res.status(200).json({message: `Succesfully edited type with id ${req.params.id}`})
        }
        catch(err) {
            console.log(err)
            next(err)
        }
    }

    static async deleteType(req, res, next) {
        try {
            await Type.destroy({where : {id : req.params.id}})
            res.status(200).json({message : `success to delete type with id ${req.params.id}`})  
        } catch (err) {
            next(err)
        }
    }

    static async getAllHistories(req, res, next) {
        try{
            const histories = await History.findAll({order : [['id', 'DESC']]})
            res.status(200).json({histories})
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = Controller