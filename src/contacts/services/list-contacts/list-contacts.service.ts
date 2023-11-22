import { Inject, Injectable } from '@nestjs/common';
import { ContactDocument, ListContactsUseCase } from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/infra/providers';

@Injectable()
export class ListContactsService implements ListContactsUseCase {
  constructor(
    @Inject(ContactsRepository)
    private readonly contactsRepository: ContactsRepository,
  ) {}

  async execute(): Promise<ContactDocument[]> {
    return this.contactsRepository.find({});
  }
}
