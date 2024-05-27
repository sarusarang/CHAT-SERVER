const Messages = require('../Models/ChatModel')


exports.savechats = async (req, res) => {


    const { senderid, receiverid, text, chatid } = req.body

    try {

        const newmessage = new Messages({

            sender: senderid, receiver: receiverid, text: text, chatid: chatid

        })
        await newmessage.save()

        res.status(200).json("message saved")

    }
    catch (err) {

        console.log(err);

    }


}



exports.showchats = async (req, res) => {


    const {id} = req.params

   

    try {

        const message = await Messages.find({chatid:id})

        res.status(200).json(message)

    }
    catch (err) {

        console.log(err);
        res.status(406).json(err)

    }


}