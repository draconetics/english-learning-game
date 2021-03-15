const mongoose = require('mongoose');

const { Schema } = mongoose;

const wordSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  sentence: {
    type: String,
    required: true
  },
  meaning: {
    type: String,
    required: true
  },
  sound: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  sentenceSp:{
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Word', wordSchema);