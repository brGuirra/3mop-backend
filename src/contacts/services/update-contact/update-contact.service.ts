import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  ContactDocument,
  UpdateContact,
  UpdateContactUseCase,
} from '@src/contacts/domain';
import { ContactsRepository } from '@src/contacts/providers';

@Injectable()
export class UpdateContactService implements UpdateContactUseCase {
  constructor(
    @Inject(ContactsRepository)
    private readonly contactsRepository: ContactsRepository,
  ) {}
  async execute(id: string, data: UpdateContact): Promise<ContactDocument> {
    if (data.email) {
      await this.validateIfEmailIsAvailable(id, data.email);
    }

    const updatedContact = await this.contactsRepository.findOneAndUpdate(
      { _id: id },
      data,
    );

    return updatedContact;
  }

  private async validateIfEmailIsAvailable(
    id: string,
    email: string,
  ): Promise<void> {
    const contact = await this.contactsRepository.findOne({
      email,
    });

    if (contact && contact._id.toString() != id) {
      throw new ConflictException('Email already in use.');
    }
  }
}
