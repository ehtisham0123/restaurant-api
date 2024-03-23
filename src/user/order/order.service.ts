import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      }, orderBy: {
        'createdAt': 'desc',
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

}
