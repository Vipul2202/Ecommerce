const express = require('express')
const router = express.Router()

router.use(require('./user'))
router.use(require('./booking'))
router.use(require('./product'))
router.use(require('./category'))

module.exports = router