
const Mark = require('../Models/MarksModel');

const addMark = async (req, res) => {
  try {
    // Parse marksObtained and totalMark to numbers
    const { studentId, studentName, subject, course, marksObtained, totalMark, teacherId } = req.body;
    const marksObtainedNumber = parseFloat(marksObtained);
    const totalMarkNumber = parseFloat(totalMark);

    const mark = new Mark({
      studentId,
      studentName,
      subject,
      course,
      marksObtained: marksObtainedNumber,
      totalMark: totalMarkNumber,
      teacherId,
    });

    const savedMark = await mark.save();
    res.status(201).json(savedMark);
  } catch (error) {
    console.error('Error adding mark:', error);
    res.status(500).json({ message: 'Failed to add mark', error: error.message });
  }
};

const getMarks= async (req, res) => {

  const { teacherId } = req.query;

  try {
    const marks = await Mark.find({ teacherId });
    res.json(marks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}


module.exports ={ addMark ,getMarks }
