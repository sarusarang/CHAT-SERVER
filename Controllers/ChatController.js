const Messages = require('../Models/ChatModel')
const { io } = require('../Socket/Socket')
const fs = require('fs');
const path = require('path');

// SAVE CHATS
exports.savechats = async (req, res) => {


    const { senderid, receiverid, text, chatid, image } = req.body

    const img = req.file ? req.file.filename : image


    try {

        const newmessage = new Messages({

            sender: senderid, receiver: receiverid, text: text, chatid: chatid, image: img

        })

        await newmessage.save()


        io.emit('newMessage', newmessage);


        res.status(200).json(newmessage)

    }
    catch (err) {

        console.log("error");

    }


}


// SHOW USER CHATS
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





// TO DELETE ALL CHATS
exports.deleteAllChats = async (req, res) => {


    try {

        const { id } = req.params

        const messages = await Messages.find({ chatid: id });


        messages.forEach(item => {

            if (item.image) {

                const fullpath = path.join(__dirname, '..', 'uploads', item.image);
                fs.unlinkSync(fullpath);
            }

        })

        const result = await Messages.deleteMany({ chatid: id })


        const afterdelete = await Messages.find({ chatid: id })

        io.emit('afterdelete', afterdelete)

        res.status(200).json(`DATA DELETED SUCCESSFULLY ${Date.now()}`)



    }

    catch (err) {

        console.log(err);
        res.status(406).json(err)
    }


}

// TO DELETE ONE CHAT
exports.Deleteonechat = async (req, res) => {

    try {


        const { id,chatid } = req.params


        const messages = await Messages.find({ _id: id });


        messages.forEach(item => {

            if (item.image) {

                const fullpath = path.join(__dirname, '..', 'uploads', item.image);
                fs.unlinkSync(fullpath);
            }

        })


        const result = await Messages.deleteOne({ _id: id })



        const onedelete = await Messages.find({ chatid: chatid })

        io.emit('onedelete', onedelete)

        res.status(200).json(`Message Deleted successfully ${Date.now()}`)



    }

    catch (err) {

        console.log(err);
        res.status(406).json(err)
    }

}
