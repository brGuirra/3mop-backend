import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@src/common/database';

export class Address {
  @Prop()
  street: string;

  @Prop()
  buildingNumber: string;

  @Prop()
  streetAddress: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;
}

@Schema({
  collection: 'contacts',
  timestamps: true,
})
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

ContactSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ContactSchema.set('toJSON', {
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});
