import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@src/common/database';

export enum StatesEnum {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}

@Schema()
export class Address {
  @Prop()
  street: string;

  @Prop()
  buildingNumber: string;

  @Prop()
  streetAddress: string;

  @Prop()
  city: string;

  @Prop({
    type: () => StatesEnum,
  })
  state: StatesEnum;

  @Prop()
  zipCode: string;
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
  cellphone: string;

  @Prop({
    type: () => Address,
  })
  address: Address;
}

export const ContactSchema = SchemaFactory.createForClass(ContactDocument);
