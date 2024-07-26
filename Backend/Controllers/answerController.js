const Answer = require('../Models/AnswerModel');
const User = require('../Models/studentModel');
const Question = require('../Models/questionModel');

const PostAnswer = async (req, res) => {
  console.log("Post Answer");
  console.log("request body:", req.body);
  const { teacherName, studentName, subject, course, userId, questionId,teacherId } = req.body;
  const file = req.file ? req.file.path : null;

  if (!file) {
    return res.status(400).json({ message: 'File upload failed' });
  }

  try {
    const user = await User.findById(userId);
    const question = await Question.findById(questionId);

    if (!user || !question) {
      return res.status(400).json({ message: 'Invalid user or question' });
    }

    const existingAnswer = await Answer.findOne({ userId, questionId });
    if (existingAnswer) {
      return res.status(400).json({ message: 'Answer sheet already uploaded' });
    }

    const newAnswer = new Answer({
      teacherId,
      teacherName,
      studentName,
      subject,
      course,
      file,
      userId,
      questionId,
    });

    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAnswer= async (req, res) => {
  console.log("Get Answer");
  const { teacherId  } = req.query;
  console.log("user id is,",teacherId)

  
  try {
    const answers = await Answer.find({ teacherId }); // Find answers matching teacherId
    res.json(answers);
  } catch (error) {
    console.error('Error fetching answers:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { PostAnswer,getAnswer };
