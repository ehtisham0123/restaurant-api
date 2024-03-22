import { ApiProperty } from '@nestjs/swagger';

enum UnitOfMeasurement {
    Grams = 'Grams',
    Kilograms = 'Kilograms',
    Milliliters = 'Milliliters',
    Liters = 'Liters',
    Teaspoons = 'Teaspoons',
    Tablespoons = 'Tablespoons',
    Cups = 'Cups',
    Pieces = 'Pieces',
    Others = 'Others'
  }
  

export class Ingredient {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'Unique identifier for the ingredient' })
    id: string;

    @ApiProperty({ example: 'Flour', description: 'Name of the ingredient' })
    name: string;

    @ApiProperty({ example: 5.99, description: 'Cost of the ingredient' })
    cost: number;

    @ApiProperty({ example: 100, description: 'Quantity of the ingredient' })
    quantity: number;

    @ApiProperty({ enum: UnitOfMeasurement,description: 'Unit of measurement for the ingredient' })
    unitOfMeasurement: UnitOfMeasurement;

    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the category was created' })
    createdAt: Date;

    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the category was last updated' })
    updatedAt: Date;
}
