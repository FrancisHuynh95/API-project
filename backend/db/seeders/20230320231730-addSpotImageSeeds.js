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
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-619648648726300172/original/a46428b5-0f2b-41cf-9aff-d9922d12e4c1.jpeg',
      preview: true
    },
      {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-619648648726300172/original/6b1f4898-1a96-4f8d-ace9-a1087f640593.jpeg',
      preview: false
    },
      {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-619648648726300172/original/9936910d-c01e-420a-8221-1e3cd548f03f.jpeg',
      preview: false
    },
      {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-619648648726300172/original/9bd47e19-7246-412e-b10b-36eb394339f1.jpeg',
      preview: false
    },
      {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-619648648726300172/original/a46428b5-0f2b-41cf-9aff-d9922d12e4c1.jpeg',
      preview: false
    },
      {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-889522166385656545/original/a54b0570-bdd8-43a8-a95b-64a0ac239ef0.jpeg',
      preview: true
    },
      {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-889522166385656545/original/ede23a17-8bc1-4d89-9cfd-399c82d86eec.jpeg',
      preview: false
    },
      {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-889522166385656545/original/55264491-1cc5-41f4-93a7-cd355fd83792.jpeg',
      preview: false
    },
      {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-889522166385656545/original/68725325-3aa2-4da2-ab04-a3fca22c8439.jpeg',
      preview: false
    },
      {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-889522166385656545/original/e9755644-2dcf-4ffd-9af3-b6d075613ef8.jpeg',
      preview: false
    },
      {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/4f28f433-5b8c-4dd2-b8df-4748215be6f9.jpg',
      preview: true
    },
      {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/90ed315e-97b9-4244-8249-3686b207380f.jpg',
      preview: false
    },
      {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/d4ade34a-0754-4955-875f-7b24d6447f1f.jpg',
      preview: false
    },
      {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/41ff1b70-5388-41f4-90a2-47d6ef940cbd.jpg',
      preview: false
    },
      {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/4fa14c3f-a17a-47b9-a652-fbbd9190006d.jpg',
      preview: false
    },
      {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689434923271200742/original/1a482e9b-50ee-4fa0-a2ba-2995e00f021c.png',
      preview: true
    },
      {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689434923271200742/original/bdbcdb1b-c431-4958-8a00-138eaf98cf14.png',
      preview: false
    },
      {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689434923271200742/original/60cf35ee-b97b-456a-b45d-a960fcbbe39c.png',
      preview: false
    },
      {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689434923271200742/original/fd8b175c-5ecd-43e0-81e1-9dbbc36f9aae.png',
      preview: false
    },
      {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689434923271200742/original/bbb5bf67-0035-4bfa-825d-8dc9599fd6ec.png',
      preview: false
    },
      {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/dc58ed57-9334-477d-9a93-8b7ca3ab0493.jpeg',
      preview: true
    },
      {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/48dbc60a-e34d-4341-a764-572adbee60d8.jpeg',
      preview: false
    },
      {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/b929db5c-a732-48d7-b70e-c93e6f417f8a.jpeg',
      preview: false
    },
      {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/4ead51ee-0227-4c82-b0d4-34b305126643.jpeg',
      preview: false
    },
      {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-563607006579215693/original/ff932670-35ff-4a73-b789-ab8814659062.jpeg',
      preview: false
    },
      {
      spotId: 6,
      url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/252843858.jpg?k=c2071641f87edc93b077b0168941448d1dedfc3b13d69842b905131360b9b76e&o=&hp=1',
      preview: true
    },
      {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/bd047233-a77c-4b05-90bd-78dc97f0a7c1.jpg',
      preview: false
    },
      {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/86723026-cf11-4023-969b-eaf0a01ce91e.jpg',
      preview: false
    },
      {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/243b24d0-cbf0-4916-95c6-7e5fe991a9af.jpg',
      preview: false
    },
      {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/b5f7f807-bd16-4b86-9504-af7d28558b95.jpg',
      preview: false
    },
      {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-795412650141531565/original/997584c6-ef2b-497b-8683-15cda56ee42c.jpeg',
      preview: true
    },
      {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-795412650141531565/original/3501fdf7-2585-4a69-a3b4-0893cc718966.jpeg',
      preview: false
    },
      {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-795412650141531565/original/5a06dc26-7f69-424b-a106-b6dc600f39e2.jpeg',
      preview: false
    },
      {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-795412650141531565/original/d991b7fd-a50b-4a62-902d-80645953f8e9.jpeg',
      preview: false
    },
      {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-795412650141531565/original/f75ca34b-abef-4b8b-8001-e7a399442ad1.jpeg',
      preview: false
    },
      {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/c239b15a-e122-43b1-9a65-30e815f0b851.jpg',
      preview: true
    },
      {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/66ecc217-63e8-4330-938f-1047b1bcef61.jpg',
      preview: false
    },
      {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/a677cf47-0ce4-4614-bc14-a6c98b1cc68b.jpg',
      preview: false
    },
      {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/61170548-0a54-4675-acf2-81209cd0f43d.jpg',
      preview: false
    },
      {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/abf7b67f-f1a7-4373-bf73-e945acdd9e5e.jpg',
      preview: false
    },
      {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/c6d98346-bb26-4a1e-9f98-fce8b87ded50.jpg',
      preview: true
    },
      {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/b2bd10db-a8c4-4283-b60a-99451e5102c7.jpg',
      preview: false
    },
      {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/10db8b87-d885-4d26-8149-4a0ae7d84f5b.jpg',
      preview: false
    },
      {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/d18a5231-1029-4741-9414-70cf7d127868.jpg',
      preview: false
    },
      {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/5a1bf0de-8edc-4d28-92cf-c940953dbcb9.jpg',
      preview: false
    },
      {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40973006/original/5e181f78-9fcf-4541-a467-e055296d92dc.jpeg',
      preview: true
    },
      {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/360539cc-9f68-4505-ac61-e1cb93a68f56.jpg',
      preview: false
    },
      {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40973006/original/f0725b43-0b15-4f8a-aff7-83e603993769.jpeg',
      preview: false
    },
      {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40973006/original/f92ea975-e347-422d-9849-82b8c11669ca.jpeg',
      preview: false
    },
      {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/34e70c46-6276-46b4-beff-c734b073e0fe.jpg',
      preview: false
    },
      {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-703910665003856105/original/3664edf1-99b4-4dfe-a03a-0bb582dcf48b.png',
      preview: true
    },
      {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-703910665003856105/original/8356a859-54c4-4539-840f-ea99de2f0c0c.jpeg',
      preview: false
    },
      {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-703910665003856105/original/320247d2-3bbf-4737-8ce2-25ebb5a880dd.jpeg',
      preview: false
    },
      {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/f353e87a-b987-4bf3-87b4-044f7f014bd2.jpg',
      preview: false
    },
      {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/efcd6eda-b0a7-4ba4-a1ee-00bb1e952d33.jpg',
      preview: false
    },
      {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37179902/original/3ed4321d-5c8d-4637-bb0c-f6471c249bd3.jpeg',
      preview: true
    },
      {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37179902/original/7611a0c1-6278-4fd5-acde-05f45c9f3f83.jpeg',
      preview: false
    },
      {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37179902/original/9ffa0321-2487-4910-bf02-6de9a1d883e0.jpeg',
      preview: false
    },
      {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37179902/original/82851c51-abda-4dc6-8ad0-212ff0101402.jpeg',
      preview: false
    },
      {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37179902/original/dda51b48-735b-499a-8991-57651007b345.jpeg',
      preview: false
    },
      {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635410431678555440/original/4992a519-2088-4e08-a927-a1cf366cfe52.jpeg',
      preview: true
    },
      {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635410431678555440/original/7e774afc-ece2-4008-904e-a69723ef7873.jpeg',
      preview: false
    },
      {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635410431678555440/original/d0c96399-66bf-41e3-a40a-3852cf1e95c4.jpeg',
      preview: false
    },
      {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635410431678555440/original/dba26ede-8a84-421e-bfed-9756c771ecdf.jpeg',
      preview: false
    },
      {
      spotId: 13,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-635410431678555440/original/e3efc179-4a39-417e-85bc-f0ad7117c46a.jpeg',
      preview: false
    },
      {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669452964242243371/original/fef32717-323c-40d2-9bc5-5c1f35835a9d.jpeg',
      preview: true
    },
      {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669452964242243371/original/7a966b9d-dada-4b6b-a7b6-5b50907a5bf6.jpeg',
      preview: false
    },
      {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669452964242243371/original/b3e12a9d-589e-45c2-b9e3-930f319937d7.jpeg',
      preview: false
    },
      {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669452964242243371/original/d26ffffe-68ae-4b3c-a0aa-6907fd60cf78.jpeg',
      preview: false
    },
      {
      spotId: 14,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669452964242243371/original/36c1cb8d-8439-4b01-b875-703a7c0bc970.jpeg',
      preview: false
    },
      {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/0897f081-d470-4a92-8771-959331374def.jpg',
      preview: true
    },
      {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/f5224860-7487-4824-a57e-2bdebea7b442.jpg',
      preview: false
    },
      {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/bbb8188a-1e0c-4bef-9f51-10dbc077b6eb.jpg',
      preview: false
    },
      {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/86bb95ab-dd9d-49d7-8285-694c8d6e59bb.jpg',
      preview: false
    },
      {
      spotId: 15,
      url: 'https://a0.muscache.com/im/pictures/8db0cb3e-9dcc-40be-bea0-6e567088b868.jpg',
      preview: false
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
