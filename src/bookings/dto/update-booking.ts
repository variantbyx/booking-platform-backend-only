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
import { ApiPropertyOptional } from '@nestjs/swagger';

import { BookingStatus } from '../entities/booking.entity';

export class UpdateBookingDto {
  @ApiPropertyOptional({ example: 'Jane Doe', description: 'The name of the customer booking the service' })
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiPropertyOptional({ example: 'jane@example.com', description: 'The email of the customer' })
  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @ApiPropertyOptional({ example: '+919876543210', description: 'Indian format phone number of the customer' })
  @IsOptional()
  @IsPhoneNumber('IN')
  customerPhone?: string;

  @ApiPropertyOptional({ example: '2026-08-15', description: 'Date of the booking (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  bookingDate?: string;

  @ApiPropertyOptional({ example: '14:30', description: 'Time of the booking (24h HH:MM format)' })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  bookingTime?: string;

  @ApiPropertyOptional({ example: 'Prefer a quiet corner seat.', description: 'Additional instructions or booking notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ enum: BookingStatus, description: 'Status of the booking' })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({ example: 1, description: 'The ID of the service to book' })
  @IsOptional()
  @IsInt()
  serviceId?: number;
}
