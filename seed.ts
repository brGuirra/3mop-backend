import { faker } from '@faker-js/faker';
import { ContactSchema, CreateContact } from '@src/contacts/domain';
import mongoose from 'mongoose';

async function seed() {
  try {
    const args = process.argv;

    const url = getArg('--db-url', args);

    await mongoose.connect(url);

    const model = mongoose.model('Contact', ContactSchema);

    await model.deleteMany({});

    const contacts: CreateContact[] = Array.from({ length: 10 }, () => {
      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        cellphone: faker.string.numeric({
          length: { min: 11, max: 11 },
          allowLeadingZeros: false,
        }),
        address: {
          street: faker.location.street(),
          buildingNumber: faker.location.buildingNumber(),
          streetAddress: faker.location.county(),
          city: faker.location.city(),
          zipCode: faker.string.numeric({
            length: {
              min: 8,
              max: 8,
            },
            allowLeadingZeros: false,
          }),
          state: faker.location.state({ abbreviated: true }),
        },
      };
    });

    await model.insertMany(contacts);

    console.log('Database seeded 🌱');

    await mongoose.disconnect();
  } catch (error) {
    console.log(error.stack);
  }
}

function getArg(argName: string, args: string[]): string {
  const argFlagIndex = args.findIndex((arg) => arg === argName);

  return args[argFlagIndex + 1];
}

seed();
