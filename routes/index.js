const express = require('express');
const { Product, Category } = require('../db/models');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const products = await Product.findAll();
    const categories = await Category.findAll();
    res.render('index', { products, categories });
  })
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

module.exports = router;
