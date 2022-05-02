'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [{
      userId: 1,
      notebookId: 1,
      title: "Shopping List",
      content: "1. milk 2. banana 3. apple 4. egg "
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
