import { Inject, Injectable } from '@nestjs/common';
import { ContactDocument } from '@src/contacts/models';
import { ContactsRepository } from '@src/contacts/providers';
import { ListContactsUseCase } from '@src/contacts/usecases';

@Injectable()
export class ListContactsService implements ListContactsUseCase {
  constructor(
    @Inject(ContactsRepository)
    private readonly contactsRepository: ContactsRepository,
  ) {}

  execute(): Promise<ContactDocument[]> {
    return this.contactsRepository.find({});
  }
}
