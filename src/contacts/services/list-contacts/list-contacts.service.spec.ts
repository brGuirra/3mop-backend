import { faker } from '@faker-js/faker/locale/pt_BR';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsRepository } from '@src/contacts/infra/providers';
import { ListContactsService } from './list-contacts.service';

describe('ListContactsService', () => {
  let listContactsService: ListContactsService;
  let contactsRepository: ContactsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListContactsService,
        {
          provide: ContactsRepository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    listContactsService = module.get<ListContactsService>(ListContactsService);

    contactsRepository = module.get<ContactsRepository>(ContactsRepository);
  });

  it('should be defined', () => {
    expect(listContactsService).toBeDefined();
    expect(contactsRepository).toBeDefined();
  });

  it('should throws when ContactsRepository throws', async () => {
    const error = new Error(faker.lorem.word());

    jest.spyOn(contactsRepository, 'find').mockRejectedValueOnce(error);

    await expect(listContactsService.execute()).rejects.toThrow(error);
  });

  it('should return a list of contacts on success', async () => {
    const fakeContactList = [
      {
        id: faker.database.mongodbObjectId(),
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
        },
      },
    ];

    jest
      .spyOn(contactsRepository, 'find')
      .mockResolvedValueOnce(fakeContactList);

    expect(await listContactsService.execute()).toEqual(fakeContactList);
  });
});
