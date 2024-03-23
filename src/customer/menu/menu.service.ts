import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }
  
  async findAll() {
    return await this.prisma.menu.findMany();
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });
    if (!menu) {
      throw new NotFoundException(`Menu Item #${id} not found`);
    }
    return menu;
  }
}



