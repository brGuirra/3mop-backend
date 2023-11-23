import { Inject, Injectable } from '@nestjs/common';
import {
  ContactDocument,
  UpdateContact,
  UpdateContactUseCase,
} from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/infra/providers';

@Injectable()
export class UpdateContactService implements UpdateContactUseCase {
  constructor(
    @Inject(ContactsRepository)
    private readonly contactsRepository: ContactsRepository,
  ) {}
  async execute(id: string, data: UpdateContact): Promise<ContactDocument> {
    const updatedContact = await this.contactsRepository.findOneAndUpdate(
      { _id: id },
      data,
    );

    return updatedContact;
  }
}
