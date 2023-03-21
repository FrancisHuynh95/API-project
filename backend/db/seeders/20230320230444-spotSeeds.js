'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';

    await queryInterface.bulkInsert(options, [
      {
        address: '123 ABC St.',
        city: 'EFG',
        state: 'HIJ',
        country: 'KLMNOP',
        lat: 100,
        lng: 200,
        name: 'QRS',
        description: 'TUV',
        price: 9.99,
        ownerId: 1
      },
      {
        address: '456 ABC St.',
        city: 'ABC',
        state: 'DEF',
        country: 'JKLMNOP',
        lat: 100,
        lng: 200,
        name: 'CAT',
        description: 'DOG',
        price: 19.99,
        ownerId: 2
      },
      {
        address: '912 Seed St.',
        city: 'San Jose',
        state: 'CA',
        country: 'USA',
        lat: 300,
        lng: 100,
        name: 'Good',
        description: 'bad',
        price: 29.99,
        ownerId: 3
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});

  }
};
