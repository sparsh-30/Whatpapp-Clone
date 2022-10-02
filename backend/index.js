const express=require('express');
const app=express();
const server=require('http').createServer(app);
const mongoose=require('mongoose');
const cors=require('cors');
const io = require("socket.io")(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});
// var {Server} = require('socket.io');
const PORT=process.env.PORT || 5000;
const Room=require('./roomSchema');

app.use(cors());
app.use(express.json());


// const io=new Server(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         methods:["GET","POST"]
//     },
// });

const url="mongodb+srv://Sparsh30:OLQTowZrZtwZtpgx@cluster0.vgkyxxj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.log("Connected successfully to the database!!")})
.catch((err)=>{console.log(err)});

// Get all rooms
app.get("/find/room",(req,res)=>{
    Room.find((err,data)=>{
        if(err) console.log(err);
        else res.status(200).json(data);
    })
})

// Save a new room
app.post("/new/room",(req,res)=>{
    const room=req.body;
    Room.create(room,(err)=>{
        if(err) res.status(500).json(err);
        else res.status(201).json({"Message":"Data stored successfully"});
    })
})

// Get a room with id
app.get("/find/room/:room_id",(req,res)=>{
    const id=req.params.room_id;
    Room.findById(id,(err,docs)=>{
        if(err) res.status(500).json(err);
        else res.status(200).json(docs.room_messages);
    })
})

// Save a message
app.post("/new/message",(req,res)=>{
    const body=req.body;
    console.log(body.sent_message);
    Room.findByIdAndUpdate(body.room_id,{$push:{room_messages:body.sent_message}},(err)=>{
        if(err) console.log(err);
        else res.json("Data Updated Successfully");
    })
})

io.on('connection',socket =>{
    socket.on('get-id',(id)=>{
        io.emit('send-to-chat',id);
    })

    socket.on('send-message',(obj)=>{
        Room.findByIdAndUpdate(obj.id,{$push:{room_messages:obj.msg}},(err)=>{
            if(err) console.log(err);
        })

        Room.findById(obj.id,(err,docs)=>{
            if(err) console.log(err);
            else{
                // console.log(docs.room_messages);
                const demo={
                    id:"0",
                    chats:docs.room_messages
                }
                io.emit('update-messages',demo);
            }
        })
    })

})

app.post("/save/message",(req,res)=>{
    const content=req.body;
    Room.findByIdAndUpdate(content.id,{$push:{room_messages:content.msg}},(err)=>{
        if(err) console.log(err);
        else res.json("Data updated successfully");
    })
})

server.listen(PORT,()=>{console.log(`Server running at port ${PORT}`)})