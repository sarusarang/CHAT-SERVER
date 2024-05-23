const express = require('express')
const usercontroller = require('../Controllers/UserController')


const router =express.Router()

// User Register
router.post('/register',usercontroller.userRegister)


module.exports = router