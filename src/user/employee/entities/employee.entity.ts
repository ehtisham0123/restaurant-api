import { ApiProperty } from '@nestjs/swagger';

export class Employee {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'Unique identifier for the employee' })
    id: string;

    @ApiProperty({ example: 'John', description: 'First name of the employee' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the employee' })
    lastName: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email address of the employee' })
    email: string;

    @ApiProperty({ example: '123 Main St, Cityville', description: 'Address of the employee' })
    address: string;

    @ApiProperty({ example: 50000.00, description: 'Salary of the employee' })
    salary: number;

    @ApiProperty({ example: '+1234567890', description: 'Contact number of the employee' })
    contact: string;

    @ApiProperty({ example: '+1122334455', description: 'Emergency contact number of the employee' })
    emergencyContact: string;

    @ApiProperty({ example: 'Male', description: 'Gender of the employee' })
    gender: string;

    @ApiProperty({ example: 'Full-time', description: 'Employment status of the employee' })
    employmentStatus: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth of the employee' })
    dateOfBirth: string; 

    @ApiProperty({ example: 'Manager', description: 'Role of the employee' })
    role: string;

    @ApiProperty({ example: '2023-01-01', description: 'Date of hire of the employee' })
    dateOfHire: string;
  
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'ID of the resturant to which the employee belongs' })
    restaurantId: string;

    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Date and time when the employee record was created' })
    createdAt: Date;
    
    @ApiProperty({ example: '2024-03-20T14:30:00.000Z', description: 'Date and time when the employee record was last updated' })
    updatedAt: Date;
}
