const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, "public")));

let messages = [];

io.on('connection', socket =>{
    console.log(`Client is connected with id: ${socket.id}`)
    socket.emit('previousMessage', messages);
    socket.on('send Message', data=>{
   
    messages.push(data);

    socket.broadcast.emit('receivedMessages', data)
    })
})

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "public","index.html"));
});

server.listen(process.env.PORT || 5173, console.log('Server is running'));