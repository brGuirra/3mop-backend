import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isZipCodeValid', async: false })
export class IsZipCodeValid implements ValidatorConstraintInterface {
  validate(zipCode: string) {
    const pattern = /^\d{8}$/;

    return pattern.test(zipCode);
  }

  defaultMessage() {
    return 'invalid zip code, must match the patter /^\\d{8}$/';
  }
}
