import { ApiProperty } from '@nestjs/swagger';

export class Employee {
    @ApiProperty()
    id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    salary: number;

    @ApiProperty()
    contact: string;

    @ApiProperty()
    emergencyContact: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    employmentStatus: string;

    @ApiProperty()
    dateOfBirth: Date; 

    @ApiProperty()
    role: string;

    @ApiProperty()
    dateOfHire: Date;

    createdAt: Date;
    updatedAt: Date;
}
