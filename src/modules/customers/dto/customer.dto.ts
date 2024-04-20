import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  ValidateNested,
  Length,
  Min,
  IsDefined,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class Address {
  @ApiProperty({
    type: String,
    example: 'Street test',
    description: 'Street where you live',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(1)
  readonly street: string;

  @ApiProperty({
    type: String,
    example: 'USA',
    description: 'Country where you live',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(1)
  readonly country: string;

  @ApiProperty({
    type: String,
    example: 'New York',
    description: 'City where you live',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(1)
  readonly city: string;

  @ApiProperty({
    type: String,
    example: '99999999',
    description: 'Zip code of your street',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(8)
  readonly zipcode: string;

  @ApiProperty({
    type: String,
    example: 'Complement test',
    description: 'Address complement',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly complement?: string;

  @ApiProperty({
    type: Number,
    example: 'brooklyn',
    description: 'Neighborhood where you live',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(3)
  readonly borough: string;

  @ApiProperty({
    type: Number,
    example: 555,
    description: 'Residential number',
    required: true,
  })
  @IsInt()
  @IsDefined()
  @Min(1)
  readonly residential_number: number;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Main address',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly main_address?: boolean;
}

export class CustomerDTO {
  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Your name',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(6)
  readonly name: string;

  @ApiProperty({
    type: String,
    example: 'johnDoe@mail.com',
    description: 'Your email',
    required: true,
  })
  @IsEmail()
  @IsDefined()
  @IsString()
  readonly email: string;

  @ApiPropertyOptional({
    type: Number,
    example: 21,
    description: 'Your age',
    required: true,
  })
  @IsInt()
  @IsDefined()
  readonly age: number;

  @ApiProperty({
    type: String,
    example: '02555554459',
    description: 'Your document',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(11)
  readonly document: string;

  @ApiProperty({
    type: String,
    example: 'M',
    description: 'Your genre',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(1)
  readonly genre: string;

  @ApiProperty({
    type: () => Address,
    required: true,
    description: 'Your adress',
  })
  @ValidateNested()
  @IsDefined()
  @Type(() => Address)
  readonly address: Address;
}
