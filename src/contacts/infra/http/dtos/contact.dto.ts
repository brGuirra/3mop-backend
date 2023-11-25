import { ApiProperty } from '@nestjs/swagger';
import { Address, ContactDocument } from '@src/contacts/domain';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class AddressDto implements Address {
  @ApiProperty({
    type: 'string',
    description: 'The street name of the address',
    example: 'Avenida Brasil',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    type: 'string',
    description: 'The building number of the address',
    example: '911',
  })
  @IsString()
  @IsNotEmpty()
  buildingNumber: string;

  @ApiProperty({
    type: 'string',
    description: 'The address of the street',
    example: 'Centro',
  })
  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @ApiProperty({
    type: 'string',
    description: 'The city of the address',
    example: 'Franca',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: 'string',
    description: "The state's code of the address",
    example: 'São Paulo',
  })
  state: string;

  @ApiProperty({
    type: 'string',
    description: 'The zip code of the address',
    example: '14400123',
  })
  zipCode: string;
}

export class ContactDto implements ContactDocument {
  @ApiProperty({
    type: 'string',
    example: '655f54e73b24a5dce198f493',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: "The contact's first name",
    example: 'Bruno',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: 'string',
    description: "The contact's last name",
    example: 'Guirra',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: 'string',
    description: "The contact's email",
    example: 'bruno.guirra@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    description: "The contact's cellphone number",
    pattern: '^d{11}$',
    example: '11999928585',
  })
  cellphone: string;

  @ApiProperty({
    type: () => AddressDto,
    description: 'The contact address information',
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
