import { Module } from '@nestjs/common';
import { SearchAdddressService } from './services';
import { HttpModule } from '@nestjs/axios';
import { SearchAddressController } from './infra/http';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://brasilapi.com.br/api/cep/v2',
    }),
  ],
  providers: [SearchAdddressService],
  controllers: [SearchAddressController],
})
export class AddressesModule {}
