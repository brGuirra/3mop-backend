import { ContactDocument, UpdateContact } from '../models';

export type UpdateContactUseCase = {
  execute(id: string, data: UpdateContact): Promise<ContactDocument>;
};
