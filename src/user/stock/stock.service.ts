import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) { }

  create(createStockDto: CreateStockDto) {
    return this.prisma.stock.create({
      data: createStockDto,
    });
  }

  findAll() {
    return this.prisma.stock.findMany();
  }

  async findOne(id: string) {
    const stock = await this.prisma.stock.findUnique({
      where: { id },
    });
    if (!stock) {
      throw new NotFoundException(`stock with ID ${id} not found`);
    }
    return stock;
  }

  async update(id: string, updatestockDto: UpdateStockDto) {
    try {
      return await this.prisma.stock.update({
        where: { id },
        data: updatestockDto,
      });
    } catch (error) {
      throw new NotFoundException(`Failed to update stock with ID ${id}`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.stock.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Failed to delete stock with ID ${id}`);
    }
  }
}