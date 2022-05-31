module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      { type: 'фрукты', createdAt: new Date(), updatedAt: new Date() },
      { type: 'овощи', createdAt: new Date(), updatedAt: new Date() },
      { type: 'молочная продукция', createdAt: new Date(), updatedAt: new Date() },
      { type: 'сладости', createdAt: new Date(), updatedAt: new Date() },
      { type: 'мясо', createdAt: new Date(), updatedAt: new Date() },
      { type: 'рыба', createdAt: new Date(), updatedAt: new Date() },
      { type: 'хлебо-булочные изделия', createdAt: new Date(), updatedAt: new Date() },
    ];

    const products = [
      {
        name: 'Помидоры', value: 100, category_id: 2, user_id: 2, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Огурцы', value: 100, category_id: 2, user_id: 2, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Свинина', value: 100, category_id: 6, user_id: 1, createdAt: new Date(), updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Categories', categories);
    await queryInterface.bulkInsert('Products', products);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
