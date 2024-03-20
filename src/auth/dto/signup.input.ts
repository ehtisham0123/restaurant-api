import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Optional, for Swagger documentation

export class SignupInput {
  @ApiProperty({ example: 'example@example.com' }) // Optional, for Swagger documentation
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'password' }) // Optional, for Swagger documentation
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  password: string;

  @ApiProperty({ example: 'John' }) // Optional, for Swagger documentation
  @IsOptional()
  firstname?: string;

  @ApiProperty({ example: 'Doe' }) // Optional, for Swagger documentation
  @IsOptional()
  lastname?: string;
}
