'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';

    await queryInterface.bulkInsert(options, [
      {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/c4c92198-fb3a-4c4b-bbb6-3aa8af8f7e73.jpg',
      preview: true
    },
      {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/fe49a8d8-18c1-43da-9935-f12dd279a4a2.jpg',
      preview: true
    },
      {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-29759423/original/62a1ef8a-c507-4c29-883e-1a3534081e26.jpeg',
      preview: true
    },
  ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
