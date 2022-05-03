'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notes', [
      {
      userId: 1,
      notebookId: 1,
      title: "Shopping List",
      content: "1. milk 2. banana 3. apple 4. egg "
    },
      {
        userId: 1,
        notebookId: 2,
        title: "Dairy Schedule",
        content: "7:00 Wakeup, 8:00 Departure, 11:00 Lunch, 12:00 Nap, 15:30 Back home"
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
