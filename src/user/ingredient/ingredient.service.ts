import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) { }

  create(createIngredientDto: CreateIngredientDto): Promise<any> {
    return this.prisma.ingredient.create({
      data: createIngredientDto,
    });
  }

  findAll(): Promise<any[]> {
    return this.prisma.ingredient.findMany();
  }

  async findOne(id: string): Promise<any> {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<any> {
    try {
      return await this.prisma.ingredient.update({
        where: { id },
        data: updateIngredientDto,
      });
    } catch (error) {
      throw new NotFoundException(`Failed to update ingredient with ID ${id}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.ingredient.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Failed to delete ingredient with ID ${id}`);
    }
  }
}