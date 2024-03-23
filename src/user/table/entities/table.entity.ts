import { ApiProperty } from "@nestjs/swagger";

export class Table {
    @ApiProperty({ example: 'cksap55v40000mssb41hik5dz', description: 'Unique identifier for the Table' })
    id: string;

    @ApiProperty({ example: '01', description: 'Name of the Table' })
    name: string;

    @ApiProperty({ example: 6, description: 'Price of the Table' })
    capacity: number;

    @ApiProperty({ example: true, description: 'reserved Table' })
    reserved: boolean;

    @ApiProperty({ example: 0, description: 'Indoor or outdoor sector' })
    sector: number;
     
    @ApiProperty({ example: '2024-03-20T12:00:00.000Z', description: 'Date and time when the Table record was created' })
    createdAt: Date;

    @ApiProperty({ example: '2024-03-20T14:30:00.000Z', description: 'Date and time when the Table record was last updated' })
    updatedAt: Date;
}
