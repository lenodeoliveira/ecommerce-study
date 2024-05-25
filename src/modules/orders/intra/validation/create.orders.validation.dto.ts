import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  Length,
  IsDefined,
  IsNumber,
  IsEnum,
} from 'class-validator';

export enum Method {
  'CARD' = 'CARTAO',
  'PIX' = 'PIX',
}

export enum Status {
  'AWAIT_PAYMENT' = 'AGUARDANDO_PAGAMENTO',
  'PAID' = 'FINALIZADO',
  'RECEIVED' = 'RECEBIDO',
}

export class CreateOrderValidationDTO {
  @ApiProperty({
    type: String,
    example: 'Order test',
    description: 'Name order',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(1)
  readonly name_order: string;

  @ApiProperty({
    type: String,
    example: 'Desc test',
    description: 'Description order',
    required: true,
  })
  @IsString()
  @IsDefined()
  @Length(1)
  readonly description: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Installments number',
    required: true,
  })
  @IsNumber()
  @IsDefined()
  readonly installment_number: number;

  @ApiProperty({
    enum: Method,
    example: 'CARTAO',
    description: 'Payment method',
    required: true,
  })
  @IsEnum(Method)
  @IsDefined()
  readonly payment_method: Method;

  @ApiProperty({
    type: String,
    example: 50,
    description: 'Total value',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly total_value: number;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Pay value',
    required: true,
  })
  @IsNumber()
  @IsDefined()
  readonly pay_value: number;

  @ApiProperty({
    enum: Status,
    example: 'RECEBIDO',
    description: 'Status order',
    required: true,
  })
  @IsEnum(Status)
  @IsDefined()
  readonly status: Status;

  @ApiProperty({
    enum: Number,
    example: 1,
    description: 'ID client',
    required: true,
  })
  @IsDefined()
  @IsNumber()
  readonly id_client: number;

  @ApiProperty({
    enum: Array,
    example: [1, 2],
    description: 'ID product',
    required: true,
  })
  @IsDefined()
  @IsNumber({}, { each: true })
  readonly id_product: number[];

  @ApiProperty({
    enum: Number,
    example: 1,
    description: 'ID cupon',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly id_cupom?: number;
}
