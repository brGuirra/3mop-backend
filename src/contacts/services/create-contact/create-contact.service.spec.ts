import { faker } from '@faker-js/faker/locale/pt_BR';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactDocument, CreateContact } from '@src/contacts/domain/models';
import { ContactsRepository } from '@src/contacts/providers';
import { Types } from 'mongoose';
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
            findOne: jest.fn(),
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

  it('should throw when ContactsRepository.findOne() throws', async () => {
    const error = new Error(faker.lorem.word());
    const data: CreateContact = {
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
    };

    jest.spyOn(contactsRepository, 'findOne').mockRejectedValueOnce(error);

    await expect(createContactService.execute(data)).rejects.toThrow(error);

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(contactsRepository.create).toHaveBeenCalledTimes(0);
  });

  it('should throw when ContactsRepository.create() throws', async () => {
    const error = new Error(faker.lorem.word());
    const data: CreateContact = {
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
    };

    jest.spyOn(contactsRepository, 'findOne').mockResolvedValueOnce(undefined);

    jest.spyOn(contactsRepository, 'create').mockRejectedValueOnce(error);

    await expect(createContactService.execute(data)).rejects.toThrow(error);

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(contactsRepository.create).toHaveBeenCalledTimes(1);
    expect(contactsRepository.create).toHaveBeenCalledWith(data);
  });

  it('should throw a ConflictException when the email is already in use', async () => {
    const data: CreateContact = {
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
    };

    jest.spyOn(contactsRepository, 'findOne').mockResolvedValueOnce({
      email: data.email,
    } as ContactDocument);

    await expect(createContactService.execute(data)).rejects.toThrow(
      new ConflictException('Email already in use.'),
    );

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(contactsRepository.create).toHaveBeenCalledTimes(0);
  });

  it('should throw a ConflictException when the email is already in use', async () => {
    const data: CreateContact = {
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
    };
    const fakeContact: ContactDocument = {
      ...data,
      _id: new Types.ObjectId(),
    };

    jest.spyOn(contactsRepository, 'findOne').mockResolvedValueOnce(undefined);

    jest
      .spyOn(contactsRepository, 'create')
      .mockImplementationOnce(() => Promise.resolve(fakeContact));

    expect(await createContactService.execute(data)).toEqual(fakeContact);

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(contactsRepository.create).toHaveBeenCalledTimes(1);
    expect(contactsRepository.create).toHaveBeenCalledWith(data);
  });
});
