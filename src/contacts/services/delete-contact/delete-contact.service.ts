import { Inject, Injectable } from '@nestjs/common';
import { DeleteContactUseCase } from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/providers';

@Injectable()
export class DeleteContactService implements DeleteContactUseCase {
  constructor(
    @Inject(ContactsRepository)
    private readonly contactsRepository: ContactsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.contactsRepository.findOneAndDelete({ _id: id });
  }
}
