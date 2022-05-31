const express = require('express');
const { Product, Category } = require('../db/models');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    if (req.session) {
      const products = await Product.findAll();
      const categories = await Category.findAll();
      res.render('index', { products, categories });
    } else {
      res.redirect('/users/signup');
    }
  })
  .post(async (req, res) => {

  })
  .delete(async (req, res) => {

  });

module.exports = router;
