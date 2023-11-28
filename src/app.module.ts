import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule, LoggerModule } from './common';
import { ContactsModule } from './contacts';
import { AddressesModule } from './addresses';
import { AuthModule } from './auth';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    DatabaseModule,
    ContactsModule,
    AddressesModule,
    AuthModule,
  ],
})
export class AppModule {}
