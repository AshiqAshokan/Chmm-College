const Question = require('../Models/questionModel');

const postQuestion = async (req, res) => {
  const { subject, chapter, course, name, userId } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'File is required' });
  }

  try {
    const question = new Question({
      subject,
      chapter,
      course,
      name,
      userId,
      file: req.file.path
    });

    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getQuestions = async (req, res) => {

  try {
   
    console.log("questions")
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { postQuestion,getQuestions };
