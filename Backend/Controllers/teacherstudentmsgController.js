const { getChatNamespace } = require('../Config/Socket');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const TeacherStudentMsg = require('../Models/TeacherStudentMsgModel');
const TeacherStudentConversation = require('../Models/TeacherStudentConversationModel');
const participants = require('../Models/participants');

// Function to post a new message
const postMessage = async (req, res) => {
  console.log(req.body)
  const io = getChatNamespace();
    const { receiverId } = req.params;
    const { message, userType } = req.body;
    const receiverType=userType
    const senderId = req.user._id; // Assuming the user is authenticated and user info is in req.user
    const senderType = req.user.userType; // Assuming userType is available in req.user

    try {
        // Check if conversation exists between the sender and receiver
        let conversation = await TeacherStudentConversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = new TeacherStudentConversation({
                participants: [senderId, receiverId]
            });
            await conversation.save();
        }

        // Create a new message
        const newMessage = new TeacherStudentMsg({
            chat: conversation._id,
            sender: senderId,
            senderType,
            receiver: receiverId,
            receiverType,
            content: message
        });
        console.log("new messages are", newMessage)

        await newMessage.save();

        const room = [senderId, receiverId].sort().join('-');
        io.to(room).emit('message', newMessage);

        res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
      console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};

// Function to fetch messages between users
const getMessages = async (req, res) => {
    const { receiverId, course } = req.params;
    const userId = req.user._id; // Assuming the user is authenticated and user info is in req.user
    const receiverIds = new ObjectId(receiverId);
    console.log('Receiver ID:', receiverIds);
    console.log('Course:', course);
    console.log('User ID:', userId);

    try {
        // Fetch the conversation between the sender and receiver
        const conversation = await TeacherStudentConversation.findOne({
            participants: { $all: [userId, receiverIds] }
        });

        if (!conversation) {
            return res.status(404).json({ success: false, message: 'No conversation found' });
        }

        // Fetch messages in the conversation
        const messages = await TeacherStudentMsg.find({ chat: conversation._id });

        console.log("stored messages", messages);

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    postMessage,
    getMessages
};
