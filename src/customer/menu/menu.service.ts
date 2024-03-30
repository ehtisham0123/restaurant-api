import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }
  async findAll(id: string) {
    return await this.prisma.menu.findMany({
      where: {
        restaurantId: id
      }
    });
  }
}



