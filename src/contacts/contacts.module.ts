import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/common';
import { ContactDocument, ContactSchema } from './models';
import { ContactsRepository } from './providers/';
import {
  CreateContactService,
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
  ],
})
export class ContactsModule {}
