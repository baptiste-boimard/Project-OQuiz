
const adminMiddleware = (req, res, next) => {
  if(!req.session.user){
    return res.redirect('/login');
  }

  if(req.session.user.role === 'admin') {
    next();
  } else {
    return res.status(401).render('401');
  }
};

module.exports = adminMiddleware;