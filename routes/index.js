const express = require('express');
const { Product, Category } = require('../db/models');
const { checkLogin } = require('../middleWares/middleWare');

const router = express.Router();

router.route('/')
  .get(checkLogin, async (req, res) => res.render('home'))
  .post(async (req, res) => {
    try {
      const { food, type } = req.body;
      const foodCategory = await Category.findOne({ where: { type } });
      const newProduct = await Product.create({
        name: food, category_id: foodCategory.id, value: 100, user_id: req.session.userId,
      });
      return res.json(newProduct);
    } catch (err) {
      return res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.body;
      await Product.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  });

router.route('/fridge')
  .get(checkLogin, async (req, res) => {
    const categories = await Category.findAll();
    if (req.session.roleId === 1) {
      const products = await Product.findAll();
      return res.render('index', { products, categories });
    }
    const { userId } = req.session;
    const products = await Product.findAll({ where: { user_id: userId } });
    return res.render('index', { products, categories });
  });

module.exports = router;
