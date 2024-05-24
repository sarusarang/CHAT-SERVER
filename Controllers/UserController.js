const users = require('../Models/UserModel')
const jwt = require('jsonwebtoken')





// USER REGISTER 
exports.userRegister = async (req, res) => {


    const {username,email,password,image} = req.body


    const profileimage = req.file ? req.file.filename : image

    

    try{

        const existinguser = await users.findOne({email})

        if(existinguser){

            res.status(401).json("User alredy Exist")

        }
        else{


            const newuser = new users({

                username,email,password,image:profileimage

            })

            await newuser.save()
            res.status(200).json(newuser)

        }

    }

    catch(error){

        console.log(error);
        res.status(404).json(error)

    }

}


// userlogin
exports.userlogin= async(req,res)=>{

    const {email,password} = req.body

   

    try{

        const existinguser = await users.findOne({email,password})

        if(existinguser){


            const token = jwt.sign({email:existinguser.email,username:existinguser.username,userid:existinguser._id},process.env.Secret_key)
            const details = {token,user:existinguser.username}
            res.status(200).json(details)

        }
        else{

            res.status(406).json("INVAILD USERNAME/PASSWORD")
        
        }

    }
    catch(err){


        res.status(406).json(err)
        console.log(err);


    }



}