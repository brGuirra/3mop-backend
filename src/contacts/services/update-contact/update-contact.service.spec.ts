import { faker } from '@faker-js/faker/locale/pt_BR';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactDocument, UpdateContact } from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/infra/providers';
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

  it('should throw when ContactsRepository.findOneAndUpdate() throws', async () => {
    const error = new Error(faker.lorem.word());
    const fakeId = faker.database.mongodbObjectId();
    const data: UpdateContact = {
      firstName: faker.person.firstName(),
    };

    jest
      .spyOn(contactsRepository, 'findOneAndUpdate')
      .mockRejectedValueOnce(error);

    await expect(updateContactService.execute(fakeId, data)).rejects.toThrow(
      error,
    );

    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: fakeId,
      },
      data,
    );
  });

  it('should partially update a contact on success and return its new data', async () => {
    const fakeId = faker.database.mongodbObjectId();
    const data: UpdateContact = {
      firstName: faker.person.firstName(),
    };
    const fakeContact: ContactDocument = {
      id: fakeId,
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

    jest
      .spyOn(contactsRepository, 'findOneAndUpdate')
      .mockImplementationOnce(({}, data: UpdateContact) =>
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
      id: fakeId,
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

    jest
      .spyOn(contactsRepository, 'findOneAndUpdate')
      .mockImplementationOnce(({}, data: UpdateContact) =>
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

    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(contactsRepository.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: fakeId,
      },
      data,
    );
  });
});
