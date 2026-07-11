import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The full name of the user' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'user@example.com', description: 'The unique email of the user' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123', description: 'The user password (minimum 6 characters)', minLength: 6 })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;
}
