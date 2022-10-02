const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
    room_name:String,
    room_messages:[{
        sender:String,
        message:String,
        timestamp:String,
        recieved:Boolean
    }]
})

module.exports=mongoose.model('ROOM',roomSchema);