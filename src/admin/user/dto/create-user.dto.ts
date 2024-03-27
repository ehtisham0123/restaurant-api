// employee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsEnum, IsNumber, MinLength, MaxLength, IsDate } from 'class-validator';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'First Name is required' })
    @IsString({ message: 'First Name should only contain letters' })
    firstName: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Last Name is required' })
    @IsString({ message: 'Last Name should only contain letters' })
    lastName: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid Email address' })
    email: string;


    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password should only contain letters' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

}
