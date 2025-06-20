const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  option1: {
    type: String,
    required: true
  },
  option1Votes: {
    type: Number,
    default: 0
  },
  option1Percentage: {
    type: Number,
    default: 0
  },
  option2: {
    type: String,
    required: true
  },
  option2Votes: {
    type: Number,
    default: 0
  },
  option2Percentage: {
    type: Number,
    default: 0
  },
  option3: {
    type: String,
    required: true
  },
  option3Votes: {
    type: Number,
    default: 0
  },
  option3Percentage: {
    type: Number,
    default: 0
  },
  option4: {
    type: String,
    required: true
  },
  option4Votes: {
    type: Number,
    default: 0
  },
  option4Percentage: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Poll', pollSchema);
