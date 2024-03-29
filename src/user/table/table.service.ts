import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TableService {
  constructor(private prisma: PrismaService) { }

  async create(createTableDto: CreateTableDto) {
    const table = await this.prisma.table.create({
      data: createTableDto,
    });
    return table;
  }

  findAll() {
    return this.prisma.table.findMany();
  } 

  async findOne(id: string) {
    const menu = await this.prisma.table.findUnique({
      where: { id },
    });
    if (!menu) {
      throw new NotFoundException(`Table #${id} not found`);
    }
    return menu;
  }

  async update(id: string, updateTableDto: UpdateTableDto) {
    try {
      return await this.prisma.table.update({
        where: { id },
        data: updateTableDto,
      });
    } catch (error) {
      throw new NotFoundException(`Table #${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.table.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Table #${id} not found`);
    }
  }
}
