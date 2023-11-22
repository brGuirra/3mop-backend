import { faker } from '@faker-js/faker/locale/pt_BR';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactDocument, UpdateContact } from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/providers';
import { Types } from 'mongoose';
import { UpdateContactService } from './update-contact.service';

describe('UpdateContactService', () => {
  let updateContactService: UpdateContactService;
  let contactsRepository: ContactsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateContactService,
        {
          provide: ContactsRepository,
          useValue: {
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    updateContactService =
      module.get<UpdateContactService>(UpdateContactService);

    contactsRepository = module.get<ContactsRepository>(ContactsRepository);
  });

  it('should be defined', () => {
    expect(updateContactService).toBeDefined();
    expect(contactsRepository).toBeDefined();
  });

  it('should throw when ContactsRepository.findOne() throws', async () => {
    const error = new Error(faker.lorem.word());
    const fakeId = faker.database.mongodbObjectId();
    const data: UpdateContact = {
      firstName: faker.person.firstName(),
    };

    jest.spyOn(contactsRepository, 'findOne').mockRejectedValueOnce(error);

    await expect(updateContactService.execute(fakeId, data)).rejects.toThrow(
      error,
    );

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledTimes(0);
  });

  it('should throw when ContactsRepository.findOneAndUpdate() throws', async () => {
    const error = new Error(faker.lorem.word());
    const fakeId = faker.database.mongodbObjectId();
    const data: UpdateContact = {
      firstName: faker.person.firstName(),
    };

    jest.spyOn(contactsRepository, 'findOne').mockResolvedValueOnce(undefined);

    jest
      .spyOn(contactsRepository, 'findOneAndUpdate')
      .mockRejectedValueOnce(error);

    await expect(updateContactService.execute(fakeId, data)).rejects.toThrow(
      error,
    );

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: fakeId,
      },
      data,
    );
  });

  it('should throw a ConflictException when the email is already in use', async () => {
    const fakeId = faker.database.mongodbObjectId();
    const data: UpdateContact = {
      firstName: faker.person.firstName(),
    };

    jest.spyOn(contactsRepository, 'findOne').mockResolvedValueOnce({
      _id: new Types.ObjectId(),
      email: data.email,
    } as ContactDocument);

    await expect(updateContactService.execute(fakeId, data)).rejects.toThrow(
      new ConflictException('Email already in use.'),
    );

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledTimes(0);
  });

  it('should partially update a contact on success and return its new data', async () => {
    const fakeId = faker.database.mongodbObjectId();
    const data: UpdateContact = {
      firstName: faker.person.firstName(),
    };
    const fakeContact: ContactDocument = {
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
    };

    jest
      .spyOn(contactsRepository, 'findOne')
      .mockResolvedValueOnce(fakeContact);

    jest
      .spyOn(contactsRepository, 'findOneAndUpdate')
      .mockImplementationOnce((data: UpdateContact) =>
        Promise.resolve({
          ...data,
          ...fakeContact,
        }),
      );

    expect(
      await updateContactService.execute(fakeId, data),
    ).toEqual<ContactDocument>({
      ...data,
      ...fakeContact,
    });

    expect(contactsRepository.findOne).toHaveReturnedTimes(0);
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: fakeId,
      },
      data,
    );
  });

  it('should update all contact information on success and return its new data', async () => {
    const fakeId = faker.database.mongodbObjectId();
    const data: UpdateContact = {
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
    };

    jest
      .spyOn(contactsRepository, 'findOne')
      .mockResolvedValueOnce(fakeContact);

    jest
      .spyOn(contactsRepository, 'findOneAndUpdate')
      .mockImplementationOnce((data: UpdateContact) =>
        Promise.resolve({
          ...data,
          ...fakeContact,
        }),
      );

    expect(
      await updateContactService.execute(fakeId, data),
    ).toEqual<ContactDocument>({
      ...data,
      ...fakeContact,
    });

    expect(contactsRepository.findOne).toHaveReturnedTimes(1);
    expect(contactsRepository.findOne).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: fakeId,
      },
      data,
    );
  });
});
