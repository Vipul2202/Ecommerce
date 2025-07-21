const express = require('express')
const router = express.Router()

router.use(require('./user'))
router.use(require('./booking'))
router.use(require('./product'))


module.exports = router