import { CreateContact } from '@src/contacts/domain';
import { ContactDto } from './contact.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateContactDto
  extends OmitType(ContactDto, ['id'])
  implements CreateContact {}
