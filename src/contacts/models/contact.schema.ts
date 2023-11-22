import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@src/common/database';

@Schema()
class Address {
  @Prop()
  street: string;

  @Prop()
  neighborhood: string;

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
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: Address;
}

export const ContactSchema = SchemaFactory.createForClass(ContactDocument);
