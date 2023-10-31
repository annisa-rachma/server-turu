const express = require('express')
const router = express.Router()
const custController = require('../controllers/custController')
const { authenticationCust } = require('../middlewares/authentication')

router.post('/register', custController.registerCust)
router.post('/login', custController.loginCust)
router.post('/google-signin', custController.loginGoogleCust)
router.get('/lodgings', custController.fetchLodgingCust)
router.get('/lodgings/:id', custController.getLodgingById)
router.get('/types', custController.getAllTypes)

router.use(authenticationCust)

router.get('/bookmarks', custController.fetchBookmark)
router.post('/bookmarks/:LodgingId', custController.addBookmark)
router.delete('/bookmarks/:id', custController.deleteBookmark)



module.exports = router