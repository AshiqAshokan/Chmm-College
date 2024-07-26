// utils/initializeCounter.js
const Counter = require('../Models/counterModel');

const initializeCounter = async () => {
  const counter = await Counter.findById('studentId');
  if (!counter) {
    await Counter.create({ _id: 'studentId', seq: 0 });
  }
};

module.exports = { initializeCounter };
