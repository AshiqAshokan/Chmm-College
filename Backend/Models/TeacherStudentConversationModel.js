const mongoose = require('mongoose');

const TeacherStudentConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'participants'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const TeacherStudentConversation = mongoose.model('TeacherStudentConversation', TeacherStudentConversationSchema);
module.exports = TeacherStudentConversation;
