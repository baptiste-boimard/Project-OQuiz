// On récupère sequelize, ainsi que le connecteur (qui sera donc toujours le meme pour tous les modèles - merci require !)
const Sequelize = require('sequelize');
const sequelize = require('../database');

// Maintenant, nos modèles héritent du "Model" de sequelize, et non plus de notre CoreModel.
class Level extends Sequelize.Model {};

/**
 * Nécessaire, requis par Sequelize
 */
Level.init({
  // Premier paramètre : un objet qui définit le type des champs
  // Remaque : en cas de relation, on ne définit pas les champs "machin_id" !
  //   ils seront définis implicitement lorsqu'on définira nos relations
  name: Sequelize.STRING
},{
  // le 2ème paramètre contient les options de connections
  sequelize, // le connecteur
  tableName: "level", // nom de la table
});

// on exporte la class directement !
module.exports = Level;