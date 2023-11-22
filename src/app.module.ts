import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule, LoggerModule } from './common';
import { ContactsModule } from './contacts';

@Module({
  imports: [LoggerModule, ConfigModule, DatabaseModule, ContactsModule],
})
export class AppModule {}
