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
      url: 'https://a0.muscache.com/im/pictures/24cc494b-eb24-48ab-97e4-decdd052d590.jpg?im_w=960',
      preview: true
    },
      {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-797171491412684011/original/c33bf5c0-f086-4a99-8912-d034dc0d19c1.jpeg?im_w=960',
      preview: true
    },
      {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/c92757c4-97a7-4b19-8f3e-658687382318.jpg?im_w=960',
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
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
