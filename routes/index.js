const express = require('express')
const router = express.Router()
const cms = require('./cms')
const customer = require('./customer')

router.use('/pub', customer)
router.use(cms)


module.exports = router