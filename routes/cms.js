const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const UserController = require('../controllers/userController')
const { authentication } = require('../middlewares/authentication')
const { authorization, authorizationForStatus } = require('../middlewares/authorization')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/google-signin', UserController.loginGoogle)

router.use(authentication)

router.get('/lodgings', Controller.getAllLodging)
router.post('/lodgings', Controller.postLodging)
router.get('/lodgings/:id', Controller.getLodgingById)
router.put('/lodgings/:id', authorization, Controller.putLodging)
router.patch('/lodgings/:id', authorizationForStatus, Controller.patchStatusLodging)
router.delete('/lodgings/:id',  authorization, Controller.deleteLodgingById)

router.get('/types', Controller.getAllType)
router.post('/types', Controller.postType)
router.get('/types/:id', Controller.getTypeById)
router.put('/types/:id', Controller.putType)
router.delete('/types/:id', Controller.deleteType)

router.get('/histories', Controller.getAllHistories)

module.exports = router