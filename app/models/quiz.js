const Sequelize = require('sequelize');
const sequelize = require('../database');

class Quiz extends Sequelize.Model {};

// Initialisation façon Sequelize (cf. Level pour plus de détails)
Quiz.init({
  title: Sequelize.STRING,
  description: Sequelize.STRING
},{
  sequelize,
  tableName: "quiz"
});

module.exports = Quiz;