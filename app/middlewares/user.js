// un petit middleware pour tester si un utilisateur est connecté
// si c'est le cas, on le rajoute dans res.locals
// ainsi, on pourra utiliser la variable "user" dans toutes les views sans se poser de question

const userMiddleware = (req, res, next) => {
  if(req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = false;
    ;

  }

  next();
};


module.exports = userMiddleware;