import { Address } from '@src/contacts/domain';

export type SearchAddressResult = Omit<Address, 'buildingNumber'>;
