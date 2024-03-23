import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTableDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @ApiProperty()
    @IsBoolean()
    reserved: boolean = false;
    
    @ApiProperty()
    @IsNumber() 
    @IsNotEmpty()
    sector: number;
}


