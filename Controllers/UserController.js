const users = require('../Models/UserModel')





// USER REGISTER 
exports.userRegister = async (req, res) => {


    const {username,email,password,image} = req.body

    console.log(req.body);

    try{

        const existinguser = await users.findOne({email})

        if(existinguser){

            res.status(401).json("User alredy Exist")

        }
        else{


            const newuser = new users({

                username,email,password,image

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