import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'Unique identifier for the User' })
    id: string;

    @ApiProperty({ example: 'John', description: 'First name of the User' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the User' })
    lastName: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email address of the User' })
    email: string;

    @ApiProperty({ example: '123 Main St, Cityville', description: 'Address of the User' })
    address: string;

    @ApiProperty({ example: '+1234567890', description: 'Contact number of the User' })
    contact: string;

    @ApiProperty({ example: 'Male', description: 'Gender of the User' })
    gender: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth of the User' })
    dateOfBirth: string;

    @ApiProperty({ example: 'Owner', description: 'Role of the User' })
    role: string;

    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the User was created' })
    createdAt: Date;

    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the User was last updated' })
    updatedAt: Date;
}
