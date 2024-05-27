const express = require('express')
const usercontroller = require('../Controllers/UserController')
const chatcontroller = require('../Controllers/ChatController')
const multer = require('../MiddleWares/Multer')
const jwt = require('../MiddleWares/JwtMiddleware')


const router =express.Router()

// User Register
router.post('/register',multer.single('image'),usercontroller.userRegister)

// user login
router.post('/login',usercontroller.userlogin)

// getuser
router.get('/getuser',jwt,usercontroller.getusers)

// edit user profile
router.put('/edituser',jwt,multer.single('image'),usercontroller.edituser)

// get all users
router.get('/getallusers',jwt,usercontroller.getallusers)


// savechats
router.post('/sendchat',jwt,chatcontroller.savechats)

// showchats 
router.get("/getchats/:id",jwt,chatcontroller.showchats)

module.exports = router