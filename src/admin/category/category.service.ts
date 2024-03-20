import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto> {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return category;
  }

  async findAll(): Promise<CreateCategoryDto[]> {
    return this.prisma.category.findMany();
  }

  async findOne(id: string): Promise<CreateCategoryDto> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CreateCategoryDto> {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }
}
