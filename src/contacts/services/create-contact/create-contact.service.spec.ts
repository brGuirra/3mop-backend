import { faker } from '@faker-js/faker/locale/pt_BR';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactDocument, CreateContact } from '@src/contacts/domain/models';
import { ContactsRepository } from '@src/contacts/infra/providers';
import { CreateContactService } from './create-contact.service';

describe('CreateContactService', () => {
  let createContactService: CreateContactService;
  let contactsRepository: ContactsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContactService,
        {
          provide: ContactsRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createContactService =
      module.get<CreateContactService>(CreateContactService);

    contactsRepository = module.get<ContactsRepository>(ContactsRepository);
  });

  it('should be defined', () => {
    expect(createContactService).toBeDefined();
    expect(contactsRepository).toBeDefined();
  });

  it('should throw when ContactsRepository.create() throws', async () => {
    const error = new Error(faker.lorem.word());
    const data: CreateContact = {
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
    };

    jest.spyOn(contactsRepository, 'create').mockRejectedValueOnce(error);

    await expect(createContactService.execute(data)).rejects.toThrow(error);

    expect(contactsRepository.create).toHaveBeenCalledTimes(1);
    expect(contactsRepository.create).toHaveBeenCalledWith(data);
  });

  it('should create a contact on success', async () => {
    const data: CreateContact = {
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
    };
    const fakeContact: ContactDocument = {
      ...data,
      id: faker.database.mongodbObjectId(),
    };

    jest
      .spyOn(contactsRepository, 'create')
      .mockImplementationOnce(() => Promise.resolve(fakeContact));

    expect(await createContactService.execute(data)).toEqual(fakeContact);

    expect(contactsRepository.create).toHaveBeenCalledTimes(1);
    expect(contactsRepository.create).toHaveBeenCalledWith(data);
  });
});
