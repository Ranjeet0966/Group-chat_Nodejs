const express=require('express');

const bodyParser=require('body-parser');
const cors=require('cors');
const http =require ("http");
const socketIO=require('socket.io')

const path = require('path');

const app=express();
const server = http.createServer(app);
const io= socketIO(server,{ cors : { origin : '*'}});


io.on("connection",(socket)=>{
    console.log('websocket connected-------------------------------------------');
    socket.on("message",(msg,userName,groupId,userId)=>{
        socket.broadcast.emit("message",msg,userName,groupId,userId)
    });
    socket.on("file",(message,userName,groupId,userId)=>{
        socket.broadcast.emit("file",message,userName,groupId,userId)

    })
})


require('dotenv').config()

const sequelize=require('./util/database');
const userRoutes=require('./routes/user');
const chatRoutes=require('./routes/chat');
const groupRoutes=require('./routes/group')
const forgotPasswordRouter= require("./routes/password");

const User=require('./models/user');
const Message=require('./models/chat');
const Group=require('./models/group');
const UserGroup=require('./models/userGroup');
const forgotPasswordRequests = require("./models/forgotPassword");

const job = require("./jobs/cron");
job.start();
app.use(cors());
app.use(bodyParser.json());


app.use(express.static('public'))

app.use(express.static('views'));



app.use('/user',userRoutes);
app.use('/chat',chatRoutes);
app.use("/password", forgotPasswordRouter);

app.use(groupRoutes);
app.use((req,res)=>{
    if(req.url==='/'){
        res.sendFile(path.join(__dirname, 'views', 'signup.html'));
    }
    else{
        res.sendFile(path.join(__dirname,`${req.url}`))
    }
})
 
  



User.hasMany(Message);
Message.belongsTo(User);


Group.belongsToMany(User,{through:UserGroup});
User.belongsToMany(Group,{through:UserGroup})

Group.hasMany(Message);
Message.belongsTo(Group); 

User.hasMany(forgotPasswordRequests);
forgotPasswordRequests.belongsTo(User);

// {force:true}
sequelize.sync()
  .then(() => {
    server.listen(process.env.PORT || 3000);
   
  })
  .catch((err) => console.log(err));