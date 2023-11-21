import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, DatabaseModule, LoggerModule } from './common';
import { ContactsModule } from './contacts';

@Module({
  imports: [LoggerModule, ConfigModule, DatabaseModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
