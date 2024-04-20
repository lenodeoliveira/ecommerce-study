import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Address {
  @ApiProperty({
    type: String,
    example: 'Street test',
    description: 'Street where you live',
    required: true,
  })
  readonly street: string;

  @ApiProperty({
    type: String,
    example: 'USA',
    description: 'Country where you live',
    required: true,
  })
  readonly country: string;

  @ApiProperty({
    type: String,
    example: 'New York',
    description: 'City where you live',
    required: true,
  })
  readonly city: string;

  @ApiProperty({
    type: String,
    example: '99999999',
    description: 'Zip code of your street',
    required: true,
  })
  readonly zipcode: string;

  @ApiProperty({
    type: String,
    example: 'Complement test',
    description: 'Address complement',
    required: false,
  })
  readonly complement?: string;

  @ApiProperty({
    type: Number,
    example: 'brooklyn',
    description: 'Neighborhood where you live',
    required: true,
  })
  readonly borough: string;

  @ApiProperty({
    type: Number,
    example: 555,
    description: 'Residential number',
    required: true,
  })
  readonly residential_number: number;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Main address',
    required: false,
  })
  readonly main_address?: boolean;
}

export class CustomerOutPutDTO {
  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Your name',
    required: true,
  })
  readonly name: string;

  @ApiProperty({
    type: String,
    example: 'johnDoe@mail.com',
    description: 'Your email',
    required: true,
  })
  readonly email: string;

  @ApiPropertyOptional({
    type: Number,
    example: 21,
    description: 'Your age',
    required: true,
  })
  readonly age: number;

  @ApiProperty({
    type: String,
    example: '02555554459',
    description: 'Your document',
    required: true,
  })
  readonly document: string;

  @ApiProperty({
    type: String,
    example: 'M',
    description: 'Your genre',
    required: true,
  })
  readonly genre: string;

  @ApiProperty({
    type: () => [Address],
    required: true,
    description: 'Your adress',
  })
  readonly address?: Address[];
}
