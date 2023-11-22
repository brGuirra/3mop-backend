import { ContactDocument } from '../models';

export type FindContactUseCase = {
  execute(id: string): Promise<ContactDocument>;
};
