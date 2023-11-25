import { Module } from '@nestjs/common';
import { SearchAdddressService } from './services';
import { HttpModule } from '@nestjs/axios';
import { SearchAddressController } from './infra/http';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://viacep.com.br/ws',
    }),
  ],
  providers: [SearchAdddressService],
  controllers: [SearchAddressController],
})
export class AddressesModule {}
