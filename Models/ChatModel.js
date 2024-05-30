const mongoose = require('mongoose')


const chatschema = new mongoose.Schema({

    
    sender: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true

    },
    receiver: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true

    },
    text:{

        type:String,
       
    },
    chatid:{

        type:String,
        required:true

    },
    image:{

        type:String

    },
    timestamp:{

        type:Date,
        default:Date.now
    }

})

const Messages= mongoose.model('Messages',chatschema)

module.exports = Messages