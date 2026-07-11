import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsPhoneNumber('IN')
  customerPhone!: string;

  @IsDateString()
  bookingDate!: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  bookingTime!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  serviceId!: number;
}
