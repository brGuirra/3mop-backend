import { ContactDocument } from './contact.schema';

export type CreateContact = Omit<ContactDocument, 'id'>;
