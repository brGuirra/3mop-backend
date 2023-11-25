import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule, LoggerModule } from './common';
import { ContactsModule } from './contacts';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [LoggerModule, ConfigModule, DatabaseModule, ContactsModule, AddressesModule],
})
export class AppModule {}
