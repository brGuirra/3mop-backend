import { Observable } from 'rxjs';
import { SearchAddressResult } from '../models';

export type SearchAddressUseCase = {
  execute(zipCode: string): Observable<SearchAddressResult>;
};
