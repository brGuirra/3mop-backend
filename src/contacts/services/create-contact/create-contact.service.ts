import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  ContactDocument,
  CreateContact,
  CreateContactUseCase,
} from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/infra/providers';

Injectable();
export class CreateContactService implements CreateContactUseCase {
  constructor(
    @Inject(ContactsRepository)
    private readonly contactsRepository: ContactsRepository,
  ) {}

  async execute(data: CreateContact): Promise<ContactDocument> {
    const isEmailAlreadyInUse = await this.contactsRepository.findOne({
      email: data.email,
    });

    if (isEmailAlreadyInUse) {
      throw new ConflictException('Email already in use.');
    }

    return this.contactsRepository.create(data);
  }
}
