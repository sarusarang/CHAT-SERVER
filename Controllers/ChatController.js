const Messages = require('../Models/ChatModel')
const { io } = require('../Socket/Socket')


exports.savechats = async (req, res) => {


    const { senderid, receiverid, text, chatid } = req.body

    try {

        const newmessage = new Messages({

            sender: senderid, receiver: receiverid, text: text, chatid: chatid

        })
        await newmessage.save()


        io.emit('newMessage', newmessage);


        res.status(200).json(newmessage)

    }
    catch (err) {

        console.log(err);

    }


}



exports.showchats = async (req, res) => {


    const { id } = req.params

    try {

        const message = await Messages.find({ chatid: id })

        res.status(200).json(message)

    }
    catch (err) {

        console.log(err);
        res.status(406).json(err)

    }


}

exports.deleteAllChats = async (req,res)=>{


    try{

        const {id} = req.params

        const result = await Messages.deleteMany({chatid:id})

        res.status(200).json(`DATA DELETED SUCCESSFULLY ${Date.now()}`)



    }

    catch(err){

        console.log(err);
        res.status(406).json(err)
    }


}

exports.Deleteonechat = async(req,res)=>{

   

    try{


        const {id} = req.params

        const result = await Messages.deleteOne({_id:id})

        console.log(result);

        res.status(200).json(`Message Deleted successfully ${Date.now()}`)


    }

    catch(err){

        console.log(err);
        res.status(406).json(err)
    }


}