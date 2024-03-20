// employee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsEnum, IsNumber, MinLength, MaxLength, IsDate, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
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

    @ApiProperty()
    @IsNotEmpty({ message: 'Address is required' })
    @MinLength(10, { message: 'Address must be at least 10 characters long' })
    @MaxLength(200, { message: 'Address cannot exceed 200 characters' })
    address: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Salary is required' })
    @IsNumber({}, { message: 'Salary must be a number' })
    salary: number;

    @ApiProperty()
    @MinLength(7, { message: 'Contact Number must be at least 7 digits long' })
    @MaxLength(15, { message: 'Contact Number cannot exceed 15 digits' })
    contact: string;

    @ApiProperty()
    @MinLength(7, { message: 'Emergency Contact Number must be at least 7 digits long' })
    @MaxLength(15, { message: 'Emergency Contact Number cannot exceed 15 digits' })
    emergencyContact: string;

    @ApiProperty()
    @IsString({ message: 'Invalid Gender' })
    gender: string;

    @ApiProperty()
    @IsString({ message: 'Invalid Status' })
    employmentStatus: string;

    @ApiProperty()
    @IsString({ message: 'Invalid Date of Birth' })
    dateOfBirth: string;

    @ApiProperty()
    @IsString({ message: 'Invalid Role' })
    role: string;
    
    @ApiProperty()
    @IsString({ message: 'Invalid Hiring Date' })
    dateOfHire: string;
}
