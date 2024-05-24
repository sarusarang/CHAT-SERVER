const jwt = require('jsonwebtoken')


const jwtmiddleware = (req, res, next) => {


    try {


        const token = req.headers.authorization.split(" ")[1]

        if (token) {

            const result = jwt.verify(token, process.env.Secret_key)
            req.payload = result.userid
            next()


        }
        else {

            res.status(406).json("Please Login")

        }


    }

    catch (err) {

        res.status(406).json("Please Login")
    }


}

module.exports = jwtmiddleware