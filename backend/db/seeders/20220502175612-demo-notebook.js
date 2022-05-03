'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notebooks', [
      {
        userId: 1,
        title: "Grocery"
      },
      {
        userId: 1,
        title: "Kids"
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
