const Word = require('../models/word');

module.exports = {
    index: async(req, res, next) => {
      console.log('getting words.');
      const words = await Word.find({});
      res.status(200).json(words);
    },
  
    newWord: async (req, res, next) => {
      const newWord = new Word(req.body);
      const word = await newWord.save();
      res.status(200).json(word);
    },
};