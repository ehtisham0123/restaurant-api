import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export enum UnitOfMeasurement {
    Grams = 'Grams',
    Kilograms = 'Kilograms',
    Milliliters = 'Milliliters',
    Liters = 'Liters',
    Teaspoons = 'Teaspoons',
    Tablespoons = 'Tablespoons',
    Cups = 'Cups',
    Pieces = 'Pieces',
    Others = 'Others',
  }

export class CreateStockDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name should only contain letters' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Cost is required' })
    @IsNumber({}, { message: 'Cost must be a number' })
    cost: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Quantity is required' })
    @IsNumber({}, { message: 'Quantity must be a number' })
    quantity: number;

    @ApiProperty()
    @IsEnum(UnitOfMeasurement, { message: 'Invalid unit of measurement' })
    unitOfMeasurement: UnitOfMeasurement;
}
