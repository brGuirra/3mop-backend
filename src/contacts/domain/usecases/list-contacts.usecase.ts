import { ContactDocument } from '../models';

export abstract class ListContactsUseCase {
  abstract execute(): Promise<ContactDocument[]>;
}
