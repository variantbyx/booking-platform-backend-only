import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { BookingStatus } from '../entities/booking.entity';

export class CreateBookingDto {
  @ApiProperty({ example: 'Jane Doe', description: 'The name of the customer booking the service' })
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @ApiProperty({ example: 'jane@example.com', description: 'The email of the customer' })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({ example: '+919876543210', description: 'Indian format phone number of the customer' })
  @IsPhoneNumber('IN')
  customerPhone!: string;

  @ApiProperty({ example: '2026-08-15', description: 'Date of the booking (YYYY-MM-DD)' })
  @IsDateString()
  bookingDate!: string;

  @ApiProperty({ example: '14:30', description: 'Time of the booking (24h HH:MM format)' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  bookingTime!: string;

  @ApiPropertyOptional({ example: 'Prefer a quiet corner seat.', description: 'Additional instructions or booking notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ enum: BookingStatus, default: BookingStatus.PENDING, description: 'Status of the booking' })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiProperty({ example: 1, description: 'The ID of the service to book' })
  @IsInt()
  serviceId!: number;
}
