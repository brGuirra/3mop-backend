import { ContactDocument } from '../models';

export type ListContactsUseCase = {
  execute(): Promise<ContactDocument[]>;
};
