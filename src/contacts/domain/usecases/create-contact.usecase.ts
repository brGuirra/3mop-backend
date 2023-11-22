import { ContactDocument, CreateContact } from '../models';

export abstract class CreateContactUseCase {
  abstract execute(data: CreateContact): Promise<ContactDocument>;
}
