// restaurant.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber, IsPostalCode, IsEmail } from 'class-validator';

export class CreateRestaurantDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name should be a string' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid Email address' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Address is required' })
    @IsString({ message: 'Address should be a string' })
    address: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Contact number is required' })
    @IsString()
    contact: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Opening time is required' })
    @IsString({ message: 'Opening time should be a string' })
    openingTime: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Closing time is required' })
    @IsString({ message: 'Closing time should be a string' })
    closingTime: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Status is required' })
    @IsString({ message: 'Status should be a string' })
    status: string;

    @ApiProperty()
    @IsString({ message: 'WiFi status should be a string' })
    wifiCode: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Postal code is required' })
    @IsString({ message: 'Postal code should be a string' })
    @IsPostalCode('any', { message: 'Invalid postal code' })
    postalCode: string;
}
