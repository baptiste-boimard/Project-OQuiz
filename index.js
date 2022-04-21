// Premier reflexe : les variables d'environnement !
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5050;

// et c'est parti pour Express !
const express = require('express');

const app = express();

// réglages views
app.set('views', 'app/views');
app.set('view engine', 'ejs');


// les statiques
app.use(express.static('public'));

// on rajoute la gestion des POST body
app.use(express.urlencoded({extended: true}));

// et on rajoute la gestion des sessions
const session = require('express-session');
const res = require('express/lib/response');
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'Un Super Secret'
}));

// et hop, notre middleware magique
const userMiddleware = require('./app/middlewares/user');
app.use(userMiddleware);

//chargement des locals pour générer mes vues dynamique
app.locals.addTags = false;
app.locals.updateTags = false;
app.locals.associateTags = false;

// le routage
const router = require('./app/router');
app.use(router);

// lancement du serveur
app.listen( PORT,  () => {
  console.log(`Listening on ${PORT}`);
});