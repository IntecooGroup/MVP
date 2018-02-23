const faker = require('faker');
const jsonfile = require('jsonfile');

const NUM_BRANDS = 5;
const OFFERS_PER_BRAND = 3;
const NUM_INFLUENCERS = 1;
const NUM_USERS = 1;
const NUM_ADMINS = 1;

faker.seed(1000);

var brandData = [];
for (var i = 0; i < NUM_BRANDS; i++) {
  brandData.push(generateBrand());
}

var influencerData = [];
for (var i = 0; i < NUM_INFLUENCERS; i++) {
  influencerData.push(generateInfluencer());
}

var userData = [];
for (var i = 0; i < NUM_USERS; i++) {
  userData.push(generateUser(brandData, influencerData, false));
}

for (var i = 0; i < NUM_ADMINS; i++) {
  userData.push(generateUser(brandData, influencerData, true));
}

const userFile = 'Users.json';
const influencerFile = 'Influencers.json';
const brandFile = 'Brands.json';

jsonfile.writeFileSync(userFile, userData, {});
jsonfile.writeFileSync(influencerFile, influencerData, {});
jsonfile.writeFileSync(brandFile, brandData, {});

function generateBrand() {
  var offers = [];
  for (var i = 0; i < OFFERS_PER_BRAND; i++) {
    offers.push(generateOffer());
  }
  return {
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    website: 'https://google.com',
    location: 'https://goo.gl/maps/peJgpiKGiCK2',
    offers: offers,
    testItem: true,
  };
}

function generateOffer() {
  return {
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    website: 'https://google.com',
    location: 'https://goo.gl/maps/peJgpiKGiCK2',
    hashtags: [
      '#' + faker.lorem.word(),
      '#' + faker.lorem.word(),
      '#' + faker.lorem.word(),
    ],
    terms: ['non-refundable', 'limit one per customer'],
  };
}

function generateInfluencer() {
  return {
    id: faker.random.uuid(),
    instagramHandle: '@food_mood_dude',
    profilePhoto: 'https://i.imgur.com/9fK6vcW.jpg',
    feed: [],
    coupons: [],
    testItem: true,
  };
}

function generateUser(brands, influencers, isAdmin) {
  var permissions = {
    intecooAdmin: isAdmin,
    influencers: [
      influencers[Math.floor(Math.random() * influencers.length)].id,
    ],
    brands: [brands[Math.floor(Math.random() * brands.length)].id],
  };

  return {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'adamszaruga+intecootest@gmail.com',
    password: 'tricksyhobbitses',
    permissions: permissions,
    testItem: true,
  };
}
