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
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 23,
        lng: 123,
        name: 'Big House In San Francisco',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate tortor vel ligula aliquet ornare. Maecenas eu nulla tellus. Duis rhoncus, arcu ac suscipit maximus, ipsum lectus pharetra tortor, vel faucibus tellus ante eu metus. ',
        price: 9.99,
        ownerId: 1
      },
      {
        address: '456 ABC St.',
        city: 'Sacramento',
        state: 'CA',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'House in Sacramento',
        description: 'Vivamus ut lacus lobortis, varius metus non, pellentesque augue. Sed eget ipsum tempor, aliquam quam in, auctor nunc. Vivamus consectetur feugiat purus, ac pellentesque tellus gravida at.',
        price: 19.99,
        ownerId: 2
      },
      {
        address: '912 Seed St.',
        city: 'San Jose',
        state: 'CA',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'House In San Jose',
        description: 'Quisque lacus neque, bibendum non consequat quis, ornare a ex. Fusce fringilla sed est non finibus. Donec in pharetra quam. Quisque venenatis vel lacus nec fermentum. Donec porta ultrices massa volutpat eleifend.',
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
