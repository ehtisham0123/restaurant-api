import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Table } from './entities/table.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('User Table')
@UseGuards(JwtAuthGuard)
@Controller('user/table')
export class TableController {
  constructor(private readonly tableService: TableService) { }
  
  @ApiOkResponse({
    type: Table,
    description: 'Create a new menu',
  })
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @ApiOkResponse({
    isArray: true,
    type: Table,
    description: 'Get all tables',
  })
  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @ApiOkResponse({
    type: Table,
    description: 'Get table by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(id);
  }

  @ApiOkResponse({
    type: Table,
    description: 'updated table with given id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(id, updateTableDto);
  }

  @ApiOkResponse({
    type: Table,
    description: 'delete a table given id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(id);
  }
}
