import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/common';
import { ContactDocument, ContactSchema } from './domain';
import { ContactsRepository } from './providers/';
import {
  CreateContactService,
  DeleteContactService,
  FindContactService,
  ListContactsService,
  UpdateContactService,
} from './services';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: ContactDocument.name,
        schema: ContactSchema,
      },
    ]),
  ],
  providers: [
    ContactsRepository,
    CreateContactService,
    ListContactsService,
    UpdateContactService,
    FindContactService,
    DeleteContactService,
  ],
})
export class ContactsModule {}
