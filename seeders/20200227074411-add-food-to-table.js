'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Food', 
      [
        {
          name: 'Nasi Goreng',
          stock: 10,
          price: 20000,
          group: `Main Course`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ketoprak',
          stock: 15,
          price: 15000,
          group: `Main Course`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Kentang Goreng',
          stock: 20,
          price: 10000,
          group: `Entree`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pudding Coklat',
          stock: 25,
          price: 5000,
          group: `Dessert`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Food', null, {});
  }
};
