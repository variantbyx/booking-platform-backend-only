import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @IsPositive()
  duration!: number;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
