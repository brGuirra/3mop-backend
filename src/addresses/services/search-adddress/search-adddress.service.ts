import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  SearchAddressResult,
  ViaCepAddressResult,
} from '@src/addresses/domain/models';
import { SearchAddressUseCase } from '@src/addresses/domain/usecases';
import { AxiosError } from 'axios';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class SearchAdddressService implements SearchAddressUseCase {
  private readonly logger = new Logger(SearchAdddressService.name);

  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {}

  execute(zipCode: string): Observable<SearchAddressResult> {
    return this.httpService.get<ViaCepAddressResult>(`${zipCode}/json`).pipe(
      map(({ data: { cep, localidade, logradouro, uf, bairro } }) => ({
        zipCode: cep,
        street: logradouro,
        streetAddress: bairro,
        city: localidade,
        state: uf,
      })),
      catchError((error: unknown) => {
        this.logger.error(error);

        if (error instanceof AxiosError) {
          if (error?.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            throw new BadGatewayException(
              'Não foi possível buscar informações do endereço',
            );
          }
        }

        throw error;
      }),
    );
  }
}
