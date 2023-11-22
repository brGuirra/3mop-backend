import { Test, TestingModule } from '@nestjs/testing';
import { ContactsRepository } from '@src/contacts/providers';
import { DeleteContactService } from './delete-contact.service';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Types } from 'mongoose';

describe('DeleteContactService', () => {
  let deleteContactService: DeleteContactService;
  let contactsRepository: ContactsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteContactService,
        {
          provide: ContactsRepository,
          useValue: {
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteContactService =
      module.get<DeleteContactService>(DeleteContactService);

    contactsRepository = module.get<ContactsRepository>(ContactsRepository);
  });

  it('should be defined', () => {
    expect(deleteContactService).toBeDefined();
    expect(contactsRepository).toBeDefined();
  });

  it('should throw when ContactsRepository.findOne() throws', async () => {
    const error = new Error(faker.lorem.word());
    const fakeId = faker.database.mongodbObjectId();

    jest
      .spyOn(contactsRepository, 'findOneAndDelete')
      .mockRejectedValueOnce(error);

    await expect(deleteContactService.execute(fakeId)).rejects.toThrow(error);

    expect(contactsRepository.findOneAndDelete).toHaveReturnedTimes(1);
    expect(contactsRepository.findOneAndDelete).toHaveBeenCalledWith({
      _id: fakeId,
    });
  });

  it('should delete a contact on success', async () => {
    const fakeId = faker.database.mongodbObjectId();

    jest.spyOn(contactsRepository, 'findOneAndDelete').mockResolvedValueOnce({
      _id: new Types.ObjectId(fakeId),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        street: faker.location.street(),
        neighborhood: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        state: faker.location.state(),
        country: faker.location.country(),
      },
    });

    expect(await deleteContactService.execute(fakeId)).toBeUndefined();

    expect(contactsRepository.findOneAndDelete).toHaveReturnedTimes(1);
    expect(contactsRepository.findOneAndDelete).toHaveBeenCalledWith({
      _id: fakeId,
    });
  });
});
