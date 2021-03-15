const Sentence = require('../models/sentence');

module.exports = {
    index: async(req, res, next) => {
      console.log('getting senteces.');
      const sentences = await Sentence.find({});
      res.status(200).json(sentences);
    },
  
    newSentence: async (req, res, next) => {
      const newSentence = new Sentence(req.body);
      const sentence = await newSentence.save();
      res.status(200).json(sentence);
    },
};