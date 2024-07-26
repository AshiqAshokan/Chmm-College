const mongoose = require('mongoose');

const TeacherStudentMsgSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeacherStudentConversation',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'participants',
        required: true
    },
    senderType: {
        type: String,
        enum: ['student', 'Teacher','Parent'],
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'participants',
        required: true
    },
    receiverType: {
        type: String,
        enum: ['student', 'Teacher','Parent'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const TeacherStudentMsg = mongoose.model('TeacherStudentMsg', TeacherStudentMsgSchema);
module.exports = TeacherStudentMsg;
