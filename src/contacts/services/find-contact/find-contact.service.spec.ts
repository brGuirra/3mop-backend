import { faker } from '@faker-js/faker/locale/pt_BR';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactDocument } from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/infra/providers';
import { Types } from 'mongoose';
import { FindContactService } from './find-contact.service';

describe('FindContactService', () => {
  let findContactService: FindContactService;
  let contactsRepository: ContactsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindContactService,
        {
          provide: ContactsRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    findContactService = module.get<FindContactService>(FindContactService);

    contactsRepository = module.get<ContactsRepository>(ContactsRepository);
  });

  it('should be defined', () => {
    expect(findContactService).toBeDefined();
    expect(contactsRepository).toBeDefined();
  });

  it('should throw when ContactsRepository.findOne() throws', async () => {
    const error = new Error(faker.lorem.word());
    const fakeId = faker.database.mongodbObjectId();

    jest.spyOn(contactsRepository, 'findOne').mockRejectedValueOnce(error);

    await expect(findContactService.execute(fakeId)).rejects.toThrow(error);

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      _id: fakeId,
    });
  });

  it('should return contact information on success', async () => {
    const fakeId = faker.database.mongodbObjectId();
    const fakeContact: ContactDocument = {
      _id: new Types.ObjectId(fakeId),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      cellphone: faker.phone.number(),
      address: {
        street: faker.location.street(),
        buildingNumber: faker.location.buildingNumber(),
        streetAddress: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        state: faker.location.state(),
        country: faker.location.country(),
      },
    };

    jest
      .spyOn(contactsRepository, 'findOne')
      .mockResolvedValueOnce(fakeContact);

    expect(await findContactService.execute(fakeId)).toEqual(fakeContact);

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      _id: fakeId,
    });
  });
});
