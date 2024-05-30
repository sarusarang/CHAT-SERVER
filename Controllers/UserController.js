const users = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');




// USER REGISTER 
exports.userRegister = async (req, res) => {


    const { username, email, password, image } = req.body


    const profileimage = req.file ? req.filename : image



    try {

        const existinguser = await users.findOne({ email })

        if (existinguser) {

            res.status(401).json("User alredy Exist")

        }
        else {


            const newuser = new users({

                username, email, password, image: profileimage

            })

            await newuser.save()
            res.status(200).json(newuser)

        }

    }

    catch (error) {

        console.log(error);
        res.status(404).json(error)

    }

}


// userlogin
exports.userlogin = async (req, res) => {

    const { email, password } = req.body



    try {

        const existinguser = await users.findOne({ email, password })

        if (existinguser) {


            const token = jwt.sign({ email: existinguser.email, username: existinguser.username, userid: existinguser._id }, process.env.Secret_key)
            const details = { token, user: existinguser.username,_id:existinguser._id}
            res.status(200).json(details)

        }
        else {

            res.status(406).json("INVAILD USERNAME/PASSWORD")

        }

    }
    catch (err) {


        res.status(406).json(err)
        console.log(err);


    }

}

// GET USER
exports.getusers = async (req, res) => {


    try {

        const _id = req.payload

        const result = await users.findOne({ _id })


        if (result) {

            const rest = { userid: result._id, username: result.username, image: result.image }

            res.status(200).json(rest)

        }
        else {

            res.status(406).json("NO USER FOUND")
            console.log("error");

        }


    }
    catch (err) {

        res.status(406).json(err)
        console.log(err);

    }

}

exports.edituser = async (req, res) => {


    const { username, image } = req.body

    const _id = req.payload;

    const profileimage = req.file ? req.file.filename : image


    try {


        const user = await users.findById({ _id })
        const oldimage = user.image

        if (req.file && oldimage){

            const fullpath = path.join(__dirname, '..', 'uploads', oldimage)
            fs.unlinkSync(fullpath)

        }

        const updateuser = await users.findOneAndUpdate({ _id }, { username: username, image: profileimage }, { new: true })
        res.status(200).json("PROFILE UPDATED")


    }
    catch (err) {

        console.log(err);
        res.status(406).json(err)

    }


}

exports.getallusers = async(req,res)=>{

    const userid = req.payload


    try{


        const result = await users.find({_id:{$ne:userid}})

        if(result){

            const userdata = result.map(item=>{

                const {image,username,_id} = item

                return {image,username,_id}

            })
           
            res.status(200).json(userdata)
          

        }
        else{

            res.status(406).json("No Users Found")
        }

    }

    catch(err){

        console.log(err);
        res.status(200).json(err)


    }

}