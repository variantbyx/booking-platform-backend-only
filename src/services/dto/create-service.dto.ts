import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Haircut & Styling', description: 'The title of the service' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @ApiProperty({ example: 'Professional haircut, wash, and style.', description: 'Detailed service description' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 45, description: 'Duration of the service in minutes' })
  @IsNumber()
  @IsPositive()
  duration!: number;

  @ApiProperty({ example: 50.0, description: 'Price of the service in USD/INR' })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiPropertyOptional({ example: true, description: 'Whether the service is active and available', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
