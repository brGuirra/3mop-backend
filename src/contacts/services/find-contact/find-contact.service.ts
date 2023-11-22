import { Inject, Injectable } from '@nestjs/common';
import { ContactDocument, FindContactUseCase } from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/providers';

@Injectable()
export class FindContactService implements FindContactUseCase {
  constructor(
    @Inject(ContactsRepository)
    private readonly contactsRepository: ContactsRepository,
  ) {}

  execute(id: string): Promise<ContactDocument> {
    return this.contactsRepository.findOne({ _id: id });
  }
}
