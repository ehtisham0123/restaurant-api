import { ApiProperty } from "@nestjs/swagger";

export class Menu {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'Unique identifier for the menu item' })
    id: string;

    @ApiProperty({ example: 'Burger', description: 'Name of the menu item' })
    name: string;

    @ApiProperty({ example: '10.99', description: 'Price of the menu item' })
    price: string;

    @ApiProperty({ example: 'true', description: 'Availability status of the menu item' })
    isAvailable: string;

    @ApiProperty({ example: '15 minutes', description: 'Preparation time of the menu item' })
    preparationTime: string;
     
    @ApiProperty({ example: 'burger.jpg', description: 'URL of the image for the menu item (optional)' })
    image: string;

    @ApiProperty({ example: 'abc123', description: 'ID of the category to which the menu item belongs' })
    categoryId: string;

    @ApiProperty({ 
        type: [String],
        description: 'Array of recommended menu item IDs associated with this menu item',
        example: ['cksap66v50001mssb52hik6ef', 'cksap77v60002mssb63hik7gh']
    })
    recommendations: string[];
    
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'ID of the resturant to which the menu item belongs' })
    restaurantId: string;

    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Date and time when the menu item record was created' })
    createdAt: Date;

    @ApiProperty({ example: '2024-03-20T14:30:00.000Z', description: 'Date and time when the menu item record was last updated' })
    updatedAt: Date;
}
