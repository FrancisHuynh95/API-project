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
        address: '123 Main St.',
        city: 'Stateline',
        state: 'NV',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Luxury Lakefront Community',
        description: 'Residence 206 is designed to inspire. Featuring relaxed gathering spaces, and a stunning kitchen, this exclusive residence is perfect for hosting. Plus, a resort fee ensures access to our private Clubhouse and beach.',
        price: 1434.99,
        ownerId: 3
      },
      {
        address: '123 Main St.',
        city: 'Haleiwa',
        state: 'HI',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Beautiful Studio, Great Location',
        description: "Keep it simple at this peaceful and centrally-located place. Tropical North Shore Nature Retreat!!! Location is amazing, 1 min. from Famous Haleiwa Town and peaceful at the same time.",
        price: 194.99,
        ownerId: 2
      },
      {
        address: '123 Las Vegas Blvd.',
        city: 'Las Vegas',
        state: 'NV',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: '6-bedroom House Arcade & Many Games',
        description: "House is located about 15 minutes away from the strip & airport. New, safe and quiet neighborhood  Tri-level house. Lots of spaces",
        price: 199.99,
        ownerId: 1
      },
      {
        address: '456 Las Vegas Blvd.',
        city: 'Las Vegas',
        state: 'NV',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: '3 beds 2baths in amazing location',
        description: "Enjoy the amenities provided in this stylish desert oasis that will make you feel right at home! This location is conveniently located near the airport (7minutes), strip (11minutes) and attractions while providing ease-of-mind in a peaceful environment.",
        price: 179.99,
        ownerId: 2
      },
      {
        address: '123 Miami St.',
        city: 'Lake Worth',
        state: 'FL',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Bliss Villa 4 w/Heated Pool +BEST Rate & Location!',
        description: "Welcome to Lake Worth Beach's coolest vacation rental. This million+ dollar property boasts an amazing courtyard with a HEATED pool, dining nooks, lounge chairs, grill, outdoor shower & cabana BA - surrounded by 4 private villas.  ",
        price: 164.99,
        ownerId: 3
      },
      {
        address: '456 Miami St.',
        city: 'Stuart',
        state: 'FL',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Eden Beach Retreat:7BR/7BA w/Dock, hot tub, & more',
        description: "Eden Beach is 7BR 7BA of Ocean-to-River paradise, w/private dock, hot tub & more.  DIRECTLY On the beach! 3 floors of lux living, oceanfront chef's kitchen & more.  Minutes from airports.",
        price: 1074.99,
        ownerId: 2
      },
      {
        address: '123 Main St.',
        city: 'Clifton',
        state: 'NJ',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Private, Newly Renovated & Modern Guest Suite',
        description: "Welcome to the brand new, clean, and modern private suite located in a peaceful neighborhood just a stone's throw away from the bustling city of New York!",
        price: 87.99,
        ownerId: 1
      },
      {
        address: '555 Celtics St.',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Modern Fireplaced Carriage House with Beach Permit',
        description: "Feel at home & relax in our new one bedroom carriage house. Modern yet classic Cape Cod style and elegance.  Rest easy on a new Stearns & Foster king size mattress with designer linens and furnishings. Cozy up to the fireplace and flat screen TV.",
        price: 399.99,
        ownerId: 2
      },
      {
        address: '123 Northern Lights St.',
        city: 'Fairbanks',
        state: 'AK',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Tiny Home On The Dome',
        description: "This one of a kind cabin, offers the most spectacular 270° views for both sunrise, sunset, and Aurora viewing! Sitting on top of the locally popular Ester Dome, this unique cabin overlooks all of Fairbanks and the surrounding areas. ",
        price: 209.99,
        ownerId: 2
      },
      {
        address: '123 Northern Lights St.',
        city: 'Crag Lake',
        state: 'AK',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Northern Lake Yukon Cabin: Lakeside Sauna & Yurt',
        description: "Northern Lake Yukon Cabin is a quiet lakefront cabin just for you. A place where you can step away from it all. Read a book by the wood stove, unwind in the sauna, jump in the lake, nap in the conservatory, visit the tree fort, and meander the trails both onsite and nearby.",
        price: 114.99,
        ownerId: 1
      },
      {
        address: '123 Main St.',
        city: 'Homewood',
        state: 'CA',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Mountain Modern The Tahoe A-Frame w/ Private Pier!',
        description: "A cozy Tahoe A-frame nestled in Homewood, CA.  Updated 1965 A-Frame on the magical West Shore in Lake Tahoe. Filtered lake views and a private pier with lake access within a short walk!",
        price: 424.99,
        ownerId: 3
      },
      {
        address: '123 Creepy Woods St.',
        city: 'Vallecito',
        state: 'CA',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'The Hideaway',
        description: "The Hideaway is an enchanting one room casita situated on the outer crest of the property, The Confluence. Wake up to the sunrise with a lush *View* of the natural countryside from your private deck. The Hideaway is accessed by a foot path (200ft) from the Main House. ",
        price: 79.99,
        ownerId: 1
      },
      {
        address: '123 Desert St.',
        city: 'Sedona',
        state: 'AZ',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Red Rock VIEWS Villa, Hiking, Iconic Chapel',
        description: "Enjoy majestic views of famous Sedona Red Rocks in the luxury of your own private villa. Steps away from  iconic Chapel of the Holy Cross,  popular hiking trails. House features  mid-century modern aesthetic, wood finishes,  1- KING size bed with 2 baths, 2 spacious living rooms, kitchen, office, outdoor dining space w BBQ.",
        price: 259.99,
        ownerId: 2
      },
      {
        address: '666 Tourist Ave.',
        city: 'Sedona',
        state: 'AZ',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'Crazy Cool Canyon Cabin! Spectacular and private!',
        description: "Unplug and unwind at this unique and tranquil getaway. Created and constructed by a local artist and his family. Featured in books, magazines and local news programs. Rooftop lawn with hot tub.",
        price: 349.99,
        ownerId: 3
      },
      {
        address: '123 Tree St.',
        city: ' Cascade-Chipita Park',
        state: 'CO',
        country: 'USA',
        lat: 12,
        lng: 123,
        name: 'The Treehouse, Modern Retreat with Panoramic Views',
        description: "Welcome to the Treehouse - the ultimate Colorado getaway.  Perched high in the trees with panoramic views, you’ll never want to leave. This completely remodeled, octagon treehouse is just 15 minutes from most attractions in Colorado Springs and 5 minutes from the famous Pikes Peak",
        price: 394.99,
        ownerId: 2
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
    await queryInterface.bulkDelete(options, null , {});
  }
};
