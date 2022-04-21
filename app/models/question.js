const Sequelize = require('sequelize');
const sequelize = require('../database');

class Question extends Sequelize.Model {};


Question.init({
  question: Sequelize.STRING,
  anecdote: Sequelize.STRING,
  wiki: Sequelize.STRING
},{
  sequelize,
  tableName: "question"
});


// on exporte la class directement !
module.exports = Question;