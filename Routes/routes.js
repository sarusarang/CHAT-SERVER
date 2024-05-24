const express = require('express')
const usercontroller = require('../Controllers/UserController')
const multer = require('../MiddleWares/Multer')


const router =express.Router()

// User Register
router.post('/register',multer.single('image'),usercontroller.userRegister)

// user login
router.post('/login',usercontroller.userlogin)


module.exports = router