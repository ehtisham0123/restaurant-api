import { ApiProperty } from "@nestjs/swagger";

export class Restaurant {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'Unique identifier for the restaurant' })
    id: string;

    @ApiProperty({ example: 'Delicious Bites', description: 'Name of the restaurant' })
    name: string;

    @ApiProperty({ example: 'info@deliciousbites.com', description: 'Email of the restaurant' })
    email: string;

    @ApiProperty({ example: '123 Main St, Cityville', description: 'Address of the restaurant' })
    address: string;

    @ApiProperty({ example: '+1234567890', description: 'Contact number of the restaurant' })
    contact: string;

    @ApiProperty({ example: '08:00 AM', description: 'Opening time of the restaurant' })
    openingTime: string;

    @ApiProperty({ example: '09:00 PM', description: 'Closing time of the restaurant' })
    closingTime: string;

    @ApiProperty({ example: 'open', description: 'Status of the restaurant (e.g., open, closed)' })
    status: string;

    @ApiProperty({ example: '1234AB', description: 'Postal code of the restaurant' })
    postalCode: string;

    @ApiProperty({ example: 'WIFI123', description: 'WiFi code of the restaurant' })
    wifiCode: string;

    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the restaurant was created' })
    createdAt: Date;

    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the restaurant was last updated' })
    updatedAt: Date;
}
