import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Employee } from './entities/employee.entity';


@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.prisma.user.create({
      data: createEmployeeDto,
    });
    return employee;
  }

  findAll(): Promise<Employee[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (error) {
      throw new NotFoundException(`Failed to update employee with ID ${id}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Failed to delete employee with ID ${id}`);
    }
  }
}
