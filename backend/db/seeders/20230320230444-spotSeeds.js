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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate tortor vel ligula aliquet ornare. Maecenas eu nulla tellus. Duis rhoncus, arcu ac suscipit maximus, ipsum lectus pharetra tortor, vel faucibus tellus ante eu metus. Nam pellentesque ullamcorper molestie. Quisque viverra libero sed gravida ornare. Praesent sit amet ornare odio. Fusce scelerisque a lorem a fringilla. Quisque tellus nisl, auctor ac ligula eu, posuere bibendum quam. Pellentesque laoreet neque vel malesuada fringilla. Duis id luctus nisi. Aliquam lorem velit, blandit dapibus ex non, pretium euismod dui. Integer est ligula, iaculis ac porta at, luctus eget purus. Duis quis dignissim turpis.',
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
        description: 'Vivamus ut lacus lobortis, varius metus non, pellentesque augue. Sed eget ipsum tempor, aliquam quam in, auctor nunc. Vivamus consectetur feugiat purus, ac pellentesque tellus gravida at. Phasellus varius rhoncus risus vel aliquet. Maecenas consectetur massa placerat, egestas mi ullamcorper, volutpat lorem. Donec convallis dictum elit, ut vulputate urna lacinia nec. Donec tincidunt est sed mauris vehicula laoreet. Vestibulum aliquet orci at turpis convallis blandit. Quisque consequat finibus urna, ac ornare orci malesuada a. Mauris venenatis erat sed sem pharetra tempor. Sed justo eros, malesuada id scelerisque vitae, pharetra non tellus. Ut malesuada dolor quis sem dictum, id congue nibh consectetur. In sodales justo vitae tortor viverra, vitae lobortis eros elementum. Vivamus placerat tempus orci. Nullam nec suscipit enim. Sed vel dapibus dui.',
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
        description: 'Quisque lacus neque, bibendum non consequat quis, ornare a ex. Fusce fringilla sed est non finibus. Donec in pharetra quam. Quisque venenatis vel lacus nec fermentum. Donec porta ultrices massa volutpat eleifend. Mauris rutrum suscipit nunc ut facilisis. Donec quis euismod mi, et vulputate lacus. Nullam dictum, lacus eu fringilla auctor, tellus sapien ultrices massa, at feugiat metus neque sit amet nulla. Cras eu dolor dignissim, accumsan libero ut, cursus felis. Vivamus tempor, mi vitae feugiat imperdiet, mi est fringilla eros, at lacinia massa eros id libero. Fusce placerat faucibus odio sollicitudin faucibus. Mauris suscipit sem quis est mollis, in consectetur urna suscipit. Duis varius aliquet ante, a pellentesque turpis egestas luctus. Phasellus consectetur, quam sed mollis euismod, nunc diam pharetra ligula, a egestas dolor erat at diam.',
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
