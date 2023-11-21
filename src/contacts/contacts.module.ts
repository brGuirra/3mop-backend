import { Module } from '@nestjs/common';
import { ContactsRepository } from './providers/';
import { DatabaseModule } from 'src/common';
import { ContactDocument, ContactSchema } from './models';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: ContactDocument.name,
        schema: ContactSchema,
      },
    ]),
  ],
  providers: [ContactsRepository],
})
export class ContactsModule {}
