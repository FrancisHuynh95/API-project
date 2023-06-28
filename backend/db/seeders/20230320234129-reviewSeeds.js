'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
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
      review: 'A huge community right off of the lake.. Its great!',
      stars: 5
    },
    {
      spotId: 1,
      userId: 2,
      review: 'Beautiful home. Right off of the lake. It has everything you will need during your stay!',
      stars: 5
    },
    {
      spotId: 2,
      userId: 3,
      review: 'Small yet cozy home. Great interior and makes you feel right at home.',
      stars: 4
    },
    {
      spotId: 3,
      userId: 2,
      review: 'Huge home, nice decor. Has a garage for us to park in. Highly recommend!',
      stars: 5
    },
    {
      spotId: 4,
      userId: 1,
      review: 'Cozy little home for us to stay a weekend at. Has a garage for us to park our car in. Everything was kept nice, and clean when we arrived.',
      stars: 5
    },
    {
      spotId: 5,
      userId: 2,
      review: 'Visited Florida for the weekend. This home had interesting decor, and came with a nice pool. Highly recommend!',
      stars: 5
    },
    {
      spotId: 6,
      userId: 1,
      review: 'This home is in a beatutiful location. Surrounded by the sea which helps keep you cool during your stay.',
      stars: 5
    },
    {
      spotId: 6,
      userId: 3,
      review: 'I love the ocean! I love this location!',
      stars: 5
    },
    {
      spotId: 7,
      userId: 1,
      review: 'A nice home located in New Jersey! Really close to New York. The decor here was great!',
      stars: 5
    },
    {
      spotId: 8,
      userId: 2,
      review: 'A nice home little home with a one car garage. Awesome that this home comes with a beach permit',
      stars: 5
    },
    {
      spotId: 9,
      userId: 3,
      review: 'If you were to visit Alaska, you need to stay at this home. It has an awesome view!',
      stars: 5
    },
    {
      spotId: 9,
      userId: 1,
      review: 'Awesome views from day time and night time!',
      stars: 5
    },
    {
      spotId: 10,
      userId: 3,
      review: 'Great cabin here in Alaska. It also comes with guest parking',
      stars: 5
    },
    {
      spotId: 11,
      userId: 2,
      review: 'Great cabin here in Alaska. It also comes with a hot tub!',
      stars: 5
    },
    {
      spotId: 12,
      userId: 3,
      review: 'Great little cabin if you want to have a get away! Awesome views of the forest below',
      stars: 5
    },
    {
      spotId: 12,
      userId: 2,
      review: 'Cool cabin, but it gets a little creepy at night..',
      stars: 3
    },
    {
      spotId: 13,
      userId: 3,
      review: 'Awesome home in Sedona. I really liked the location.',
      stars: 5
    },
    {
      spotId: 14,
      userId: 1,
      review: 'Awesome home in Sedona. I really liked the location. The place had a lot of plants which help liven the place up.',
      stars: 5
    },
    {
      spotId: 15,
      userId: 1,
      review: 'Awesome little home in the forest. Makes me feel like we were staying in a tree house.',
      stars: 5
    },
    {
      spotId: 15,
      userId: 3,
      review: 'Cool cabin in the forest.',
      stars: 5
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
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null , {});
  }
};
