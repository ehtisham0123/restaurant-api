import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
    @ApiProperty({ description: 'Unique identifier for the order item', example: '8fbc7104-9f87-4aaa-a580-9cd635e63b5c' })
    id: string;
  
    @ApiProperty({ description: 'Menu details for the order item' })
    menu: {
      id: string;
      categoryId: string;
      image: string;
      isAvailable: string;
      name: string;
      preparationTime: string;
      price: string;
    };
  
    @ApiProperty({ description: 'Quantity of the menu item ordered', example: 2 })
    quantity: number;
  
    @ApiProperty({ description: 'Price of the menu item', example: 100 })
    price: number;
  }

export class Order {
  @ApiProperty({ description: 'Unique identifier for the order', example: '40cc7652-2904-4e34-907f-151bd64181ef' })
  id: string;

  @ApiProperty({ description: 'Array of order items', type: [OrderItem] })
  items: OrderItem[];

  @ApiProperty({ description: 'Unique identifier for the order', example: 1 })
  status: number;

  @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Date and time when the menu item record was created' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-20T14:30:00.000Z', description: 'Date and time when the menu item record was last updated' })
  updatedAt: Date;
}
