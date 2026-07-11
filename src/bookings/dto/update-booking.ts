import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

import { BookingStatus } from '../entities/booking.entity';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  customerPhone?: string;

  @IsOptional()
  @IsDateString()
  bookingDate?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  bookingTime?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsInt()
  serviceId?: number;
}
