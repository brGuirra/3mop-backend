import { Injectable, Logger } from '@nestjs/common';
import { ContactDocument } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from 'src/common/database/abstract.repository';
import { Model } from 'mongoose';

@Injectable()
export class ContactsRepository extends AbstractRepository<ContactDocument> {
  protected readonly logger = new Logger(ContactsRepository.name);

  constructor(
    @InjectModel(ContactDocument.name)
    protected readonly personModel: Model<ContactDocument>,
  ) {
    super(personModel);
  }
}
