
const Comment = require('../Models/CommentModel');

const PostComment = async (req, res) => {

    console.log("Reached in post Comment")

  const { name, email, message } = req.body;

  try {
    const newComment = new Comment({ name, email, message });
    await newComment.save();
    res.status(201).json({ message: 'Comment received' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }

};

module.exports = {
    PostComment,
};