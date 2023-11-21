import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';

@Schema()
class Address {
  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop()
  country: string;
}

@Schema({ versionKey: false })
export class ContactDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: Address;
}

export const ContactSchema = SchemaFactory.createForClass(ContactDocument);
