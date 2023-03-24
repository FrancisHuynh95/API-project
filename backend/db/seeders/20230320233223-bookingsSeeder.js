'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
    spotId: 1,
    userId: 1,
    // startDate: '2023/1/1',
    startDate: '01-01-23',
    // endDate: '2023/1/3',
    endDate: '01-03-23'
   },
    {
    spotId: 2,
    userId: 2,
    // startDate: '2023/2/1',
    startDate: '01-02-23',
    // endDate: '2023/2/3',
    endDate: '02-03-23'
   },
    {
    spotId: 3,
    userId: 3,
    // startDate: '2023/3/1',
    startDate: '03-01-23',
    // endDate: '2023/3/3',
    endDate: '03-03-23'
   },

  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
