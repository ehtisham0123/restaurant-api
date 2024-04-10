import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

enum Label {
    Home = 'Home',
    Office = 'Office',
    Shop = 'Shop'
}

  
class OrderItemDto {
  @ApiProperty({ description: 'Menu ID', example: 'e148fbec-ba5a-4c09-8e48-ee43f7bcbf80' })
  @IsString()
  @IsNotEmpty()
  menuId: string;

  @ApiProperty({ description: 'Quantity', example: 5 })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Price', example: 10.5 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class OrderAddressDto {
    @ApiProperty({ description: 'Full Name', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    fullName: string;
  
    @ApiProperty({ description: 'Mobile Number', example: '1234567890' })
    @IsString()
    @IsNotEmpty()
    mobileNumber: string;
  
    @ApiProperty({ description: 'Province', example: 'Ontario' })
    @IsString()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ description: 'City', example: 'Toronto' })
    @IsString()
    @IsNotEmpty()
    city: string;
  
    @ApiProperty({ description: 'Area', example: 'Downtown' })
    @IsString()
    @IsNotEmpty()
    area: string;
  
    @ApiProperty({ description: 'Address', example: '123 Main St' })
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @ApiProperty({ description: 'Label', example: 'Home' })
    label?: Label;
  }

export class CreateOrderDto {
  @ApiProperty({ description: 'Restaurant ID', example: 'e148fbec-ba5a-4c09-8e48-ee43f7bcbf80' })
  @IsNotEmpty()
  restaurantId : string;

  @ApiProperty({ description: 'Table ID', example: 'e148fbec-ba5a-4c09-8e48-ee43f7bcbf81', required: false })
  tableId?: string; 

  @ApiProperty({ description: 'Order items', type: [OrderItemDto] })
  @IsNotEmpty()
  items: OrderItemDto[];

  @ApiProperty({ description: 'Order address', type: OrderAddressDto, required: false })
  orderAddress?: OrderAddressDto;
}
