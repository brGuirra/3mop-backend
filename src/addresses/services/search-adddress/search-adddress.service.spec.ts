import { Test, TestingModule } from '@nestjs/testing';
import { SearchAdddressService } from './search-adddress.service';

describe('SearchAdddressService', () => {
  let service: SearchAdddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchAdddressService],
    }).compile();

    service = module.get<SearchAdddressService>(SearchAdddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
