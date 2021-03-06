const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      { type: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { type: 'user', createdAt: new Date(), updatedAt: new Date() },
    ];

    const password = await bcrypt.hash('123', 10);
    const users = [
      {
        name: 'Admin', password, role_id: 1, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Garegin', password, role_id: 2, createdAt: new Date(), updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Roles', roles);
    await queryInterface.bulkInsert('Users', users);
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
