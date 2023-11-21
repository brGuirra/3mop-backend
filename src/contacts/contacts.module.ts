import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/common';
import { ContactDocument, ContactSchema } from './models';
import { ContactsRepository } from './providers/';
import { CreateContactService } from './services';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: ContactDocument.name,
        schema: ContactSchema,
      },
    ]),
  ],
  providers: [ContactsRepository, CreateContactService],
})
export class ContactsModule {}
