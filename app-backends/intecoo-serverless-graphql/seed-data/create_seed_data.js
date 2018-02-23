const faker = require('faker');
const jsonfile = require('jsonfile');

const numUsers = 10;
const tweetsPerUser = 5;
const followersPerUser = 2;

const udata = [];
const tdata = [];
const handleNames = [];

function generateUser(userIndex) {
  const following = [];

  //create user info
  for (let k = 0; k < followersPerUser; k++) {
    following.push(handleNames[Math.floor(Math.random() * handleNames.length)]);
  }

  const followers_count = faker.random.number({
    min: 1,
    max: 500,
  });

  const friends_count = faker.random.number({
    min: 1,
    max: 500,
  });

  const favourites_count = faker.random.number({
    min: 1,
    max: 5000,
  });

  const name = faker.name.findName();
  const location = faker.address.city();
  const description = faker.name.jobTitle();

  const userInfo = {
    handle: handleNames[userIndex],
    name: name,
    location: location,
    description: description,
    followers_count: followers_count,
    friends_count: friends_count,
    favourites_count: favourites_count,
    following: following,
  };

  return userInfo;
}

function generateTweet(userIndex) {
  return {
    handle: handleNames[userIndex],
    tweet_id: faker.random.uuid(),
    tweet: faker.lorem.sentence(),
    retweeted: faker.random.boolean(),
    retweet_count: faker.random.number({
      min: 1,
      max: 50,
    }),
    favorited: faker.random.boolean(),
    created_at: faker.date.between('2016-01-01', '2017-01-27'),
  };
}

faker.seed(1000);

for (let i = 0; i < numUsers; i++) {
  const handle = faker.internet.userName();
  handleNames.push(handle);
}
if (handleNames.indexOf('LeoDiCaprio') < 0) {
  handleNames.push('LeoDiCaprio');
}

for (let i = 0; i < handleNames.length; i++) {
  //create user info
  udata.push(generateUser(i));
  //create tweet info
  for (let j = 0; j < tweetsPerUser; j++) {
    tdata.push(generateTweet(i));
  }
}

const ufile = 'Users.json';
const tfile = 'Tweets.json';

jsonfile.writeFileSync(ufile, udata, {});

jsonfile.writeFileSync(tfile, tdata, {});
