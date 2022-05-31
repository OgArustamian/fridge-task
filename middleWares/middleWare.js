function checkSession(req, res, next) {
  if (req.session.userId) {
    res.locals.user = {
      name: req.session.userName,
      id: req.session.userId,
      pass: req.session.userPass,
      roleId: req.session.role_id,
    };
    return next();
  }
  return next();
}

function checkLogin(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/');
  }
  return next();
}

module.exports = { checkSession, checkLogin };
