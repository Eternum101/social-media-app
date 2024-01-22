import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

const userIds = Array.from({length: 8}, () => new mongoose.Types.ObjectId());

export const users = userIds.map((userId) => ({
  _id: userId,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  picturePath: faker.image.avatar(),
  friends: [],
  location: faker.location.city() + ", " + faker.location.state(),
  occupation: faker.person.jobTitle(),
  viewedProfile: faker.string.numeric(5),
  impressions: faker.string.numeric(5),
  followers: faker.string.numeric(5), 
  createdAt: faker.date.past().getTime(),
  updatedAt: faker.date.recent().getTime(),
  __v: 0,
}));

export const posts = Array.from({length: 6}, () => {
  const user = faker.helpers.arrayElement(users);

  return {
    _id: new mongoose.Types.ObjectId(),
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    description: faker.lorem.paragraph(),
    picturePath: faker.image.url(),
    userPicturePath: user.picturePath,
    likes: new Map(userIds.map((id) => [id, faker.datatype.boolean()])),
    comments: Array.from({length: faker.number.int({min: 0, max: 10})}, () => faker.lorem.sentence()),
  };
});


