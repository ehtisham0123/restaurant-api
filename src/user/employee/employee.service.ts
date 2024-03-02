import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    const employee = await this.prisma.employee.create({
      data: createEmployeeDto,
    });
    return employee;
  }

  async findAll(): Promise<CreateEmployeeDto[]> {
    return this.prisma.employee.findMany();
  }

  async findOne(id: number): Promise<CreateEmployeeDto> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<CreateEmployeeDto> {
    try {
      return await this.prisma.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (error) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.employee.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
  }
}
