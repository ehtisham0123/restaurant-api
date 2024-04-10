import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    price: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    isAvailable: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    preparationTime: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    image: string;
   
    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    recommendations?: string[];

    @ApiProperty()
    @IsString() 
    @IsNotEmpty()
    categoryId: string;

    @ApiProperty()
    @IsString() 
    @IsNotEmpty()
    restaurantId: string;
}
