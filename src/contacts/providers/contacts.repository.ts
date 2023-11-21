import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from '@src/common/database';
import { Model } from 'mongoose';
import { ContactDocument } from '../models';

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
