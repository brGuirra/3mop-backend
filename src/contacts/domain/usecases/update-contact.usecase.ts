import { ContactDocument, UpdateContact } from '../models';

export abstract class UpdateContactUseCase {
  abstract execute(id: string, data: UpdateContact): Promise<ContactDocument>;
}
