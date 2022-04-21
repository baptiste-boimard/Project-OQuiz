const { Quiz } = require('../models/');

const mainController = {

  homePage: async (req, res) => {
    try {
      const quizzes = await Quiz.findAll({
        include: ['author']
      });
      res.render('index', { quizzes });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  }

};


module.exports = mainController;