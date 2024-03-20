import { ApiProperty } from "@nestjs/swagger";

export class Category {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'Unique identifier for the category' })
    id: string;
  
    @ApiProperty({ example: 'Burger', description: 'Name of the category' })
    name: string;
  
    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the category was created' })
    createdAt: Date;
  
    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the category was last updated' })
    updatedAt: Date;
}
