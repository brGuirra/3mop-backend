import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ZipCodeValidationPipe implements PipeTransform {
  transform(zipCode: string): string {
    const pattern = /^\d{8}$/;

    if (!pattern.test(zipCode)) {
      throw new BadRequestException('formato de CEP inválido');
    }

    return zipCode;
  }
}
