const mongoose = require('mongoose');

const { Schema } = mongoose;

const sentenceSchema = new Schema({
  sentence: {
    type: String,
    required: true,
  },
  spanishSentence: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Sentence', sentenceSchema);