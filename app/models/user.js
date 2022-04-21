const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {

  get fullname() {
    return this.firstname + ' ' + this.lastname;
  };

};

User.init({
  email: Sequelize.STRING,
  role: Sequelize.STRING,
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}, {
  sequelize,
  tableName: "user"
});


module.exports = User;