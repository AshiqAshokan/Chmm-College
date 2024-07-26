const Note = require('../Models/notesModel');

const addNote = async (req, res) => {
  try {
    console.log(req.body); 
    console.log(req.file); 
    const { subject, chapter, course, userId } = req.body;
    const file = req.file.path; // Get the file path

    const note = new Note({
      subject,
      chapter,
      course,
      file,
      userId,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getNotes=async (req, res) => {

  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date descending
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Server Error' });
  }
}


module.exports = { addNote,getNotes };
