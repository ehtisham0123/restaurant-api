import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Order[]> {
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
