import { Test, TestingModule } from '@nestjs/testing';
import { ListContactsService } from './list-contacts.service';
import { ContactsRepository } from '@src/contacts/providers';
import { faker } from '@faker-js/faker';

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
});
