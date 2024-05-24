const express = require('express')
const usercontroller = require('../Controllers/UserController')
const multer = require('../MiddleWares/Multer')
const jwt = require('../MiddleWares/JwtMiddleware')


const router =express.Router()

// User Register
router.post('/register',multer.single('image'),usercontroller.userRegister)

// user login
router.post('/login',usercontroller.userlogin)

// getuser
router.get('/getuser',jwt,usercontroller.getusers)


module.exports = router