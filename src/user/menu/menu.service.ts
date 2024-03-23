import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  async create(createMenuDto: CreateMenuDto) {
    const menu = await this.prisma.menu.create({
      data: createMenuDto
    });
    return menu;
  }

  async findAll() {
    return this.prisma.menu.findMany();
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });
    if (!menu) {
      throw new NotFoundException(`Menu Item #${id} not found`);
    }
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    try {
      return await this.prisma.menu.update({
        where: { id },
        data: updateMenuDto,
      });
    } catch (error) {
      throw new NotFoundException(`Menu #${id} not found`);
    }
  }
  
  async remove(id: string) {
    try {
      await this.prisma.menu.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Menu #${id} not found`);
    }
  }
}



