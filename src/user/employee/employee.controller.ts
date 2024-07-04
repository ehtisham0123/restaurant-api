import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('User Employee')
@UseGuards(JwtAuthGuard)
@Controller('user/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
 
  @ApiOkResponse({
    type: Employee,
    description: 'Create a new employee',
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiOkResponse({
    isArray: true,
    type: Employee,
    description: 'Get all employees',
  })
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @ApiOkResponse({
    type: Employee,
    description: 'Get employee by given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }  
  
  @ApiOkResponse({
    type: Employee,
    description: 'Update the employee by given id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @ApiOkResponse({
    type: Employee,
    description: 'Delete the employee by given id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
