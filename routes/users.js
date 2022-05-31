const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { checkLogin } = require('../middleWares/middleWare');

const router = express.Router();

router.route('/signup')
  .get(checkLogin, (req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    const { name, password } = req.body;
    if (name && password) {
      const user = await User.findOne({ where: { name } });
      if (!user) {
        const newUser = await User.create({ name, password: await bcrypt.hash(password, 10), role_id: 2 });
        req.session.userId = newUser.id;
        req.session.userName = newUser.name;
        req.session.userPass = newUser.password;
        req.session.roleId = newUser.role_id;
        return res.redirect('/');
      }
      return res.redirect('/users/login');
    }
    return res.redirect('users/signup');
  });

router.route('/login')
  .get(checkLogin, (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    const { name, password } = req.body;
    if (name && password) {
      const currentUser = await User.findOne({ where: { name } });
      if ((currentUser && await bcrypt.compare(password, currentUser.password))
       || (currentUser && password === currentUser.password)) {
        req.session.userId = currentUser.id;
        req.session.userName = currentUser.name;
        req.session.userPass = currentUser.password;
        req.session.roleId = currentUser.role_id;
        return res.redirect('/');
      }
      return res.redirect('/users/login');
    }
    return res.redirect('/users/login');
  });

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sID').redirect('/');
});

module.exports = router;
