// employee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsEnum, IsNumber, MinLength, MaxLength, IsDate } from 'class-validator';

export class CreateCategoryDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Category Name is required' })
    @IsString({ message: 'Category Name should only contain letters' })
    name: string;
}
