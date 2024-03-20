import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz' })
    menuId: string;

    @ApiProperty({ example: 12 })
    quantity: number;

    @ApiProperty({ example: 100 })
    price: number;
}

export class Order {
    @ApiProperty({ example: '311f2ae6-7878-4f20-8833-dcf577eb24d8', description: 'The unique identifier of the order' })
    id: string;

    @ApiProperty({
        type: [OrderItem],
        description: 'List of items in the order',
    })
    items: OrderItem[];
}