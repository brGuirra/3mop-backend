import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/common';
import { ContactDocument, ContactSchema } from './domain';
import {
  CreateContactController,
  DeleteContactController,
  FindContactController,
  ListContactsController,
  UpdateContactController,
} from './infra/http';
import { ContactsRepository } from './infra/providers/';
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
  controllers: [
    CreateContactController,
    ListContactsController,
    UpdateContactController,
    FindContactController,
    DeleteContactController,
  ],
})
export class ContactsModule {}
