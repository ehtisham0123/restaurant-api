import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Optional, for Swagger documentation

export class RefreshTokenInput {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }) // Optional, for Swagger documentation
  @IsNotEmpty({ message: 'Token should not be empty' })
  @IsJWT({ message: 'Invalid token format' })
  token: string;
}
