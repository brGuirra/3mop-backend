import { ContactDocument, CreateContact } from '../models';

export type CreateContactUseCase = {
  execute(data: CreateContact): Promise<ContactDocument>;
};
