const express = require('express')
const router = express.Router()
router.use(require('./booking'))
router.use(require('./category'))
router.use(require('./product'))


module.exports = router