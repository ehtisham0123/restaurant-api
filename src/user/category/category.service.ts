import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
