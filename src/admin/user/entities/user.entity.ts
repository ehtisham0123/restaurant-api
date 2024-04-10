import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../common/enums/role.enum";

export class User {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'Unique identifier for the User' })
    id: string;

    @ApiProperty({ example: 'John', description: 'First name of the User' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the User' })
    lastName: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email address of the User' })
    email: string;

    @ApiProperty({ example: 'Waqas123', description: 'Password of the User' })
    passwrod: string;

    @ApiProperty({ example: 'Admin', description: 'Role of the User' })
    role: Role;

    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the User was created' })
    createdAt: Date;

    @ApiProperty({ example: '2024-03-17T22:29:55.062Z', description: 'Date and time when the User was last updated' })
    updatedAt: Date;
}
