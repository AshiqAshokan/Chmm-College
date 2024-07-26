const socketio = require('socket.io');
let io;
let chatNamespace;
let callNamespace;

const initSocket = (server) => {
  io = socketio(server, {
    cors: {
      origin: 'http://localhost:3000',  // Replace with your frontend URL
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  chatNamespace = io.of('/chat');
  callNamespace = io.of('/call');

  chatNamespace.on('connection', (socket) => {
    console.log('New chat WebSocket connection');

    socket.on('join', ({ userId, receiverId }) => {
      const room = [userId, receiverId].sort().join('-');
      socket.join(room);
      console.log(`User ${userId} joined chat room ${room}`);
    });

    socket.on('sendMessage', (message) => {
      const room = [message.sender, message.receiver].sort().join('-');
      chatNamespace.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('Chat WebSocket disconnected');
    });
  });
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

  callNamespace.on('connection', (socket) => {
    console.log("socket connected",socket.id)
    socket.on('joinRoom',(data)=>{
      console.log("joinRoom",data)
      const { email, roomNumber } = data
      emailToSocketIdMap.set(email,socket.id)
      socketidToEmailMap.set(socket.id,email)
      callNamespace.to(roomNumber).emit("userjoined", { email, id: socket.id})
      socket.join(roomNumber)
      callNamespace.to(socket.id).emit("joinRoom",data)
    })

    socket.on('callUser',({offer, to})=>{
      callNamespace.to(to).emit("incommingcall",{ from : socket.id, offer })
    })

    
    socket.on('answerCall',({answer, to})=>{
      callNamespace.to(to).emit("answerCall",{ from : socket.id, answer})
    }) 
   
    socket.on('peer:nego:needed',({offer, to})=>{
      console.log("peer:nego:needed",offer)
      callNamespace.to(to).emit("peer:nego:needed",{ from : socket.id, offer})
    }) 
    socket.on('peer:nego:accepted',({answer, to})=>{
      console.log("peer:nego:accepted",answer)
      callNamespace.to(to).emit("peer:nego:final",{ from : socket.id, answer})
    }) 
   
    socket.on('endCall', ({ to }) => {
      callNamespace.to(to).emit('endCall');
    });
   
     
  });
};

const getChatNamespace = () => {
  if (!chatNamespace) {
    throw new Error('Chat namespace not initialized');
  }
  return chatNamespace;
};

const getCallNamespace = () => {
  if (!callNamespace) {
    throw new Error('Call namespace not initialized');
  }
  return callNamespace;
};

module.exports = { initSocket, getChatNamespace, getCallNamespace };
