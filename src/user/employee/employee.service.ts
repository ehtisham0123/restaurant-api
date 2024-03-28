import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.prisma.employee.create({
      data: createEmployeeDto,
    });
    return employee;
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return await this.prisma.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (error) {
      throw new NotFoundException(`Failed to update employee with ID ${id}`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.employee.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Failed to delete employee with ID ${id}`);
    }
  }
}
