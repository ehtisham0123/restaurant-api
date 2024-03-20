import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({ description: 'Menu ID', example: '112321321321313' })
    @IsString()
    @IsNotEmpty()
    menuId: string;

    @ApiProperty({ description: 'Quantity', example: 5 })
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ description: 'Price at order Time', example: 10.5 })
    @IsNumber()
    @IsNotEmpty()
    price: number;
}
