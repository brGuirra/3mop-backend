import { ContactDocument } from '../models';

export abstract class FindContactUseCase {
  abstract execute(id: string): Promise<ContactDocument>;
}
